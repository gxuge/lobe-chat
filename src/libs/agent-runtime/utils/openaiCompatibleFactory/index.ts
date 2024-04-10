import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI, { ClientOptions } from 'openai';

import { LobeRuntimeAI } from '../../BaseAI';
import { ILobeAgentRuntimeErrorType } from '../../error';
import { ChatCompetitionOptions, ChatStreamPayload } from '../../types';
import { AgentRuntimeError } from '../createError';
import { debugStream } from '../debugStream';
import { desensitizeUrl } from '../desensitizeUrl';
import { handleOpenAIError } from '../handleOpenAIError';

interface OpenAICompatibleFactoryOptions {
  baseURL?: string;
  chatCompletion?: {
    handlePayload?: (payload: ChatStreamPayload) => OpenAI.ChatCompletionCreateParamsStreaming;
  };
  constructorOptions?: ClientOptions;
  debug?: {
    chatCompletion: () => boolean;
  };
  errorType: {
    bizError: ILobeAgentRuntimeErrorType;
    invalidAPIKey: ILobeAgentRuntimeErrorType;
  };
  provider: string;
}

export const LobeOpenAICompatibleFactory = ({
  provider,
  baseURL: DEFAULT_BASE_URL,
  errorType: ErrorType,
  debug,
  constructorOptions,
  chatCompletion,
}: OpenAICompatibleFactoryOptions) =>
  class LobeOpenAICompatibleAI implements LobeRuntimeAI {
    client: OpenAI;

    baseURL: string;

    constructor({ apiKey, baseURL = DEFAULT_BASE_URL, ...res }: ClientOptions) {
      if (!apiKey) throw AgentRuntimeError.createError(ErrorType.invalidAPIKey);

      this.client = new OpenAI({ apiKey, baseURL, ...constructorOptions, ...res });
      this.baseURL = this.client.baseURL;
    }

    async chat(payload: ChatStreamPayload, options?: ChatCompetitionOptions) {
      try {
        const postPayload = chatCompletion?.handlePayload
          ? chatCompletion.handlePayload(payload)
          : (payload as unknown as OpenAI.ChatCompletionCreateParamsStreaming);

        const response = await this.client.chat.completions.create(postPayload);
        const [prod, useForDebug] = response.tee();

        if (debug?.chatCompletion?.()) {
          debugStream(useForDebug.toReadableStream()).catch(console.error);
        }

        return new StreamingTextResponse(OpenAIStream(prod, options?.callback), {
          headers: options?.headers,
        });
      } catch (error) {
        let desensitizedEndpoint = this.baseURL;

        if (this.baseURL !== DEFAULT_BASE_URL) {
          desensitizedEndpoint = desensitizeUrl(this.baseURL);
        }

        if ('status' in (error as any)) {
          switch ((error as Response).status) {
            case 401: {
              throw AgentRuntimeError.chat({
                endpoint: desensitizedEndpoint,
                error: error as any,
                errorType: ErrorType.invalidAPIKey,
                provider: provider as any,
              });
            }

            default: {
              break;
            }
          }
        }

        const { errorResult, RuntimeError } = handleOpenAIError(error);

        throw AgentRuntimeError.chat({
          endpoint: desensitizedEndpoint,
          error: errorResult,
          errorType: RuntimeError || ErrorType.bizError,
          provider: provider as any,
        });
      }
    }
  };
