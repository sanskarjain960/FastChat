import React from "react";
import { Moon, Sun, Check } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "./ThemeContext";

export default function ThemeSettings() {
  const { theme, updateTheme } = useTheme();

  const colorThemes = [
    { name: "Default", value: "default", color: "#f4f1f0" },
    { name: "Red", value: "red", color: "#ff4d4f" },
    { name: "Yellow", value: "yellow", color: "#fadb14" },
    { name: "Blue", value: "blue", color: "#1890ff" },
    { name: "Orange", value: "orange", color: "#fa8c16" },
    { name: "Green", value: "green", color: "#52c41a" },
    { name: "Violet", value: "violet", color: "#7c4dff" },
    { name: "Rose", value: "rose", color: "#eb2f96" },
  ];

  const handleToggleDarkMode = () => {
    updateTheme({ isDark: !theme.isDark });
  };

  const handleColorChange = (color) => {
    updateTheme({ color });
  };

  return (
    <div className="space-y-6 p-4 text-black dark:text-white">
      {/* Dark Mode Toggle */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="dark-mode" className="text-lg font-medium">
            Dark Mode
          </Label>
          <Switch
            id="dark-mode"
            checked={theme.isDark}
            onCheckedChange={handleToggleDarkMode}
            className="ml-2"
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Switch between light and dark theme
        </p>
      </div>

      {/* Color Theme Selection */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Theme Color</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {colorThemes.map((colorTheme) => (
            <button
              key={colorTheme.value}
              className={`flex items-center rounded-md border-[2px] p-2 ${
                theme.color === colorTheme.value
                  ? "border-gray-700 dark:border-gray-300"
                  : "border-gray-200 dark:border-gray-700"
              } hover:bg-gray-100 dark:hover:bg-gray-800`}
              onClick={() => handleColorChange(colorTheme.value)}
            >
              <div
                className="mr-2 h-4 w-4 rounded-full"
                style={{ backgroundColor: colorTheme.color }}
              ></div>
              <span className="text-sm">{colorTheme.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
