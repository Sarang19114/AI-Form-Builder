import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Themes from "@/app/_data/Themes";
import GradientBg from "@/app/_data/GradientBg";
import { Button } from "@/components/ui/button";
import Style from "@/app/_data/Style";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

function Controller({ selectedTheme, selectedBackground, selectedStyle, setSignInEnable }) {
  const [showMore, setShowMore] = useState(6);

  return (
    <div className="space-y-8 p-6">
      {/* Theme Selection */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Theme</h3>
        <Select onValueChange={selectedTheme}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent>
            {Themes.map((theme, index) => (
              <SelectItem key={index} value={theme.theme}>
                {theme.theme}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {/* Background Selection */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Background</h3>
        <div className="grid grid-cols-3 gap-3">
          {GradientBg.slice(0, showMore).map((bg, index) => (
            <div
              key={index}
              onClick={() => selectedBackground(bg.gradient)}
              className="group relative aspect-video rounded-lg cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2"
              style={{ background: bg.gradient }}
            >
              {index === 0 && (
                <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-700 bg-gray-100/80">
                  None
                </span>
              )}
            </div>
          ))}
        </div>
        <Button
          onClick={() => setShowMore(showMore > 6 ? 6 : 20)}
          variant="outline"
          className="w-full"
        >
          {showMore > 6 ? "Show Less" : "Show More Backgrounds"}
        </Button>
      </section>

      {/* Style Selection */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Style</h3>
        <div className="grid grid-cols-2 gap-3">
          {Style.map((item, index) => (
            <div
              key={index}
              onClick={() => selectedStyle(item)}
              className="p-4 rounded-lg border border-gray-200 cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 active:bg-gray-100"
            >
              <span className="text-sm font-medium text-gray-900">{item.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Social Authentication Toggle */}
      <section className="flex items-center space-x-3 rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="social-auth"
            onCheckedChange={setSignInEnable}
            className="h-5 w-5"
          />
          <Label 
            htmlFor="social-auth" 
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            Enable social authentication before form submission
          </Label>
        </div>
      </section>
    </div>
  );
}

export default Controller;