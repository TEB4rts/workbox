import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full py-4 px-6 bg-white/80 backdrop-blur-sm fixed top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded gradient-primary flex items-center justify-center">
            <Box className="w-5 h-5 text-white" />
          </div>
          <span className="logo-text">WorkBox</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="/#tools" className="nav-link">Tools</a>
          <a href="/portfolio" className="nav-link">Portfolio</a>
          <a href="/invoice" className="nav-link">Invoice</a>
        </nav>

        <div className="flex items-center gap-4">
          <Button 
            variant="outline"
            className="hidden md:flex gradient-hover"
            onClick={() => navigate('/editor/new')}
          >
            Create Contract
          </Button>
          <Button 
            className="gradient-primary gradient-hover"
            onClick={() => navigate('/proposal/new')}
          >
            New Proposal
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;