import Header from '@/components/Header';
import ListImages from '@/components/ListImages';
import { useParams } from 'react-router-dom';

export default function Folder() {
  // Extracting 'folderName' from the URL parameters
  const { folderName } = useParams();

  return (
    <>
      <Header title={folderName ? decodeURIComponent(folderName) : 'Folder'} />

      {/* Ensure folderName is not undefined before rendering ListImages */}
      {folderName && <ListImages for={`${folderName}`} />}
    </>
  );
}
