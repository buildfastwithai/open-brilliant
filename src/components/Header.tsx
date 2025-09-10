"use client";

import { useState } from "react";
import { ExternalLink, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b-2 border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Open Brilliant
              </h1>
              <p className="text-sm text-muted-foreground">
                AI Physics Animations
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="https://buildfastwithai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 transition-colors"
            >
              Build Fast With AI
              <ExternalLink className="w-3 h-3" />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground"
            size={"icon"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-3">
              <a
                href="https://buildfastwithai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-foreground hover:text-muted-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                BuildFastWithAI
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
