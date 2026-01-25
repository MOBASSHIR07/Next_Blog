import { redirect } from 'next/navigation';
const Dashboard = () => {
    return redirect("dashboard/create-post")
};

export default Dashboard;