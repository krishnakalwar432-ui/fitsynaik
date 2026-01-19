import AppShell from "@/components/AppShell";
import ModuleEmbed from "@/components/ModuleEmbed";

interface ModulePageProps {
  url: string;
  title: string;
}

const ModulePage = ({ url, title }: ModulePageProps) => {
  return (
    <AppShell>
      <div className="h-[calc(100vh-4rem)]">
        <ModuleEmbed url={url} title={title} />
      </div>
    </AppShell>
  );
};

export default ModulePage;
