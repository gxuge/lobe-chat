import { Empty } from 'antd';
import { Center } from 'react-layout-kit';

import DataTable from './DataTable';
import { refreshCacheFiles } from './actions';
import { CachePanelContextProvider } from './cacheProvider';

const CacheViewer = async () => {
  const files = await refreshCacheFiles();

  if (!files || files.length === 0)
    return (
      <Center height={'80%'}>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </Center>
    );

  return (
    <CachePanelContextProvider entries={files}>
      <DataTable />
    </CachePanelContextProvider>
  );
};

export default CacheViewer;
