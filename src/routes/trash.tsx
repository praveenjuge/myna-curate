import Header from '@/components/Header';
import ListImages from '@/components/ListImages';
import { Button } from '@/components/ui/button';

export default function Trash() {
  return (
    <>
      <Header title="Trash">
        <Button size="xs" variant="destructive">
          Delete
        </Button>
      </Header>
      <ListImages for="trash" />
    </>
  );
}
