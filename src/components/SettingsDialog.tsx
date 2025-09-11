"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ApiKeySettings from "./ApiKeySettings";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onApiKeyChange: (apiKey: string) => void;
}

export default function SettingsDialog({ 
  isOpen, 
  onClose, 
  apiKey, 
  onApiKeyChange 
}: SettingsDialogProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold">Settings</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <ApiKeySettings 
              apiKey={apiKey}
              onApiKeyChange={onApiKeyChange}
              isMobile={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}