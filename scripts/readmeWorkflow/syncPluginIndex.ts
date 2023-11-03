import { consola } from 'consola';
import { markdownTable } from 'markdown-table';

import { DataItem, PLUGIN_REPO, PLUGIN_SPLIT } from './const';
import { fetchPluginIndex, genLink, readReadme, updateReadme, writeReadme } from './utlis';

const genPluginTable = (data: DataItem[], lang: string) => {
  const isCN = lang === 'zh-CN';
  const content = data
    .filter((item) => item.author === 'LobeHub')
    .map((item) => [genLink(item.meta.title, item.homepage), item.meta.description]);
  return markdownTable([
    [isCN ? '官方插件' : 'Official Plugin', isCN ? '插件说明' : 'Description'],
    ...content,
  ]);
};

const runPluginTable = async (lang: string) => {
  const data = await fetchPluginIndex(lang);
  const md = readReadme(lang);
  const mdTable = genPluginTable(data, lang);
  const newMd = updateReadme(
    PLUGIN_SPLIT,
    md,
    [mdTable, `> 📊 Total plugins: ${genLink(`<kbd>**${data.length}**</kbd>`, PLUGIN_REPO)}`].join(
      '\n\n',
    ),
  );
  writeReadme(newMd, lang);
  consola.success('Sync plugin index success!');
};

export default async () => {
  await runPluginTable('en-US');
  await runPluginTable('zh-CN');
};
