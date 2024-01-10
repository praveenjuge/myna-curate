import Header from '@/components/Header';
import ListImages from '@/components/ListImages';

export default function Index() {
  return (
    <>
      <Header title="Everything" />
      <ListImages for="everything" />
    </>
  );
}
