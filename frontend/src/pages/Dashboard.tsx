import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex justify-center items-start min-h-[calc(100vh-64px)] py-8 px-2">
        <Card className="w-full max-w-5xl mx-auto">
            <div className="w-full flex items-center justify-center">
              <iframe
                title="Dashboard"
                width="1250"
                height="640"
                src="https://app.powerbi.com/view?r=eyJrIjoiYzExZmNkMzAtMjFiYS00Nzg4LWFkNTAtN2RiN2ZmMjNhMmU0IiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9&pageName=3985cfbbca3729579ac0"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;