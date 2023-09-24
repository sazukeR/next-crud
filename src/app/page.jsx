import TaskCard from './components/TaskCard';
import { prisma } from './libs/prisma';

const loadTasks = async () => {
 // ALSO WE CAN RETURN THE DATA WITH FETCH

 return await prisma.task.findMany();
};

export default async function HomePage() {
 const tasks = await loadTasks();
 console.log(tasks);

 return (
  <section className='container mx-auto'>
   <div className='grid grid-cols-3 gap-3 mt-10'>
    {tasks.map((task) => (
     <TaskCard key={task.id} task={task} />
    ))}
   </div>
  </section>
 );
}
