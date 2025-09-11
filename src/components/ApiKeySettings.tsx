"use client";

import { useState } from "react";
import { Settings, Eye, EyeOff, Key } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ApiKeySettingsProps {
  apiKey: string;
  onApiKeyChange: (apiKey: string) => void;
  isMobile?: boolean;
}

export default function ApiKeySettings({ apiKey, onApiKeyChange, isMobile = false }: ApiKeySettingsProps) {
  const [showApiKey, setShowApiKey] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(apiKey);

  const handleSave = () => {
    onApiKeyChange(tempApiKey);
  };

  const handleReset = () => {
    setTempApiKey(apiKey);
  };

  const hasChanges = tempApiKey !== apiKey;

  if (isMobile) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Key className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-lg">API Settings</h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-2">
              Cerebras API Key
            </label>
            <div className="relative">
              <Input
                type={showApiKey ? "text" : "password"}
                placeholder="Enter your Cerebras API key"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Get your API key from{" "}
            <a
              href="https://cloud.cerebras.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Cerebras Cloud
            </a>
          </p>
          
          {hasChanges && (
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave} className="flex-1">
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleReset} className="flex-1">
                Reset
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-primary" />
          <CardTitle className="text-base">API Configuration</CardTitle>
        </div>
        <CardDescription>
          Configure your Cerebras API key for physics generation
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Cerebras API Key
          </label>
          <div className="relative">
            <Input
              type={showApiKey ? "text" : "password"}
              placeholder="Enter your Cerebras API key"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setShowApiKey(!showApiKey)}
            >
              {showApiKey ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground">
          Get your API key from{" "}
          <a
            href="https://cloud.cerebras.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Cerebras Cloud
          </a>
        </p>
        
        {hasChanges && (
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} className="flex-1">
              Save Changes
            </Button>
            <Button size="sm" variant="outline" onClick={handleReset} className="flex-1">
              Reset
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}