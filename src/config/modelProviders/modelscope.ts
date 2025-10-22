import { ModelProviderCard } from '@/types/llm';

// ref: https://modelscope.cn/docs/model-service/API-Inference/intro
const ModelScope: ModelProviderCard = {
  chatModels: [
    {
      contextWindowTokens: 131_072,
      description:
        'DeepSeek R1 通过利用增加的计算资源和在后训练过程中引入算法优化机制，显著提高了其推理和推断能力的深度。该模型在各种基准评估中表现出色，包括数学、编程和一般逻辑方面。其整体性能现已接近领先模型，如 O3 和 Gemini 2.5 Pro。',
      displayName: 'DeepSeek-R1-0528',
      enabled: true,
      functionCall: true,
      id: 'deepseek-ai/DeepSeek-R1-0528',
    },
    {
      contextWindowTokens: 131_072,
      description: 'DeepSeek V3.1 模型为混合推理架构模型，同时支持思考模式与非思考模式。',
      displayName: 'DeepSeek V3.1',
      enabled: true,
      functionCall: true,
      id: 'deepseek-ai/DeepSeek-V3.1',
    },
    {
      contextWindowTokens: 131_072,
      description: 'DeepSeek V3.2 Exp 模型为混合推理架构的实验版本，同时支持思考与非思考模式。',
      displayName: 'DeepSeek V3.2 Exp',
      enabled: true,
      functionCall: true,
      id: 'deepseek-ai/DeepSeek-V3.2-Exp',
    },
    {
      contextWindowTokens: 131_072,
      description: 'Qwen3-235B-A22B是通义千问3代超大规模模型，提供顶级的AI能力。',
      displayName: 'Qwen3-235B-A22B',
      enabled: true,
      functionCall: true,
      id: 'Qwen/Qwen3-235B-A22B',
    },
    {
      contextWindowTokens: 131_072,
      description: 'Qwen3-32B是通义千问3代模型，具有强大的推理和对话能力。',
      displayName: 'Qwen3-32B',
      enabled: true,
      functionCall: true,
      id: 'Qwen/Qwen3-32B',
    },
    {
      contextWindowTokens: 131_072,
      description: 'Qwen3-VL-30B A3B 指令调优版本，支持多模态推理与理解。',
      displayName: 'Qwen3-VL-30B A3B Instruct',
      enabled: true,
      functionCall: true,
      id: 'Qwen/Qwen3-VL-30B-A3B-Instruct',
      vision: true,
    },
    {
      contextWindowTokens: 131_072,
      description: 'Qwen3-VL-235B A22B 指令调优版本，具备顶级多模态理解和生成能力。',
      displayName: 'Qwen3-VL-235B A22B Instruct',
      enabled: true,
      functionCall: true,
      id: 'Qwen/Qwen3-VL-235B-A22B-Instruct',
      vision: true,
    },
    {
      contextWindowTokens: 131_072,
      description: 'Qwen3-VL-30B A3B 思考（Thinking）版本，支持更强的推理链与多模态能力。',
      displayName: 'Qwen3-VL-30B A3B Thinking',
      enabled: true,
      functionCall: true,
      id: 'Qwen/Qwen3-VL-30B-A3B-Thinking',
      reasoning: true as any,
      vision: true,
    },
  ],
  checkModel: 'Qwen/Qwen3-4B',
  description: 'ModelScope是阿里云推出的模型即服务平台，提供丰富的AI模型和推理服务。',
  id: 'modelscope',
  modelList: { showModelFetcher: true },
  name: 'ModelScope',
  settings: {
    disableBrowserRequest: true, // CORS Error
    proxyUrl: {
      placeholder: 'https://api-inference.modelscope.cn/v1',
    },
    sdkType: 'openai',
    showModelFetcher: true,
  },
  url: 'https://modelscope.cn',
};

export default ModelScope;
