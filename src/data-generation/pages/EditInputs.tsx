import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface ModuleData {
  [key: string]: {
    prompt: string;
    perigon_query?: string;
  };
}

interface SectorQueries {
  [key: string]: string;
}

const DataGenerationTool: React.FC = () => {
  const [config, setConfig] = useState<ModuleData>({});
  const [sectorQueries, setSectorQueries] = useState<SectorQueries>({});
  const [selectedModule, setSelectedModule] = useState<string>("");
  const [promptText, setPromptText] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("prompts");
  const [selectedDataModule, setSelectedDataModule] = useState<string>("");
  const [dataModuleQuery, setDataModuleQuery] = useState<string>("");
  const [selectedSector, setSelectedSector] = useState<string>("");
  const [sectorQuery, setSectorQuery] = useState<string>("");

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_GEN_BASE_URL}config`);
      const data = await response.json();
      setConfig(data.data_modules || {});
      setSectorQueries(data.sector_queries || {});
      if (Object.keys(data.data_modules || {}).length > 0) {
        setSelectedModule(Object.keys(data.data_modules)[0]);
        setPromptText(data.data_modules[Object.keys(data.data_modules)[0]].prompt);
      }
      if (Object.keys(data.sector_queries || {}).length > 0) {
        setSelectedSector(Object.keys(data.sector_queries)[0]);
        setSectorQuery(data.sector_queries[Object.keys(data.sector_queries)[0]]);
      }
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };

  const handleModuleChange = (value: string) => {
    setSelectedModule(value);
    setPromptText(config[value]?.prompt || "");
  };

  const handleDataModuleChange = (value: string) => {
    setSelectedDataModule(value);
    setDataModuleQuery(config[value]?.perigon_query || "");
  };

  const handleSectorChange = (value: string) => {
    setSelectedSector(value);
    setSectorQuery(sectorQueries[value] || "");
  };

  const handlePromptUpdate = async () => {
    if (!promptText) {
      toast.error("Please enter a prompt to update.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_DATA_GEN_BASE_URL}save-prompt/${selectedModule}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: promptText }),
        }
      );

      if (response.ok) {
        toast.success("Prompt updated successfully!");
      } else {
        toast.error("Failed to update prompt.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the prompt.");
    }
  };

  const handleQueryUpdate = async () => {
    const queriesUpdated = {
      updatedSector: selectedSector,
      updatedSectorQuery: sectorQuery,
      updatedDataModule: selectedDataModule,
      updatedDataModuleQuery: dataModuleQuery,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_DATA_GEN_BASE_URL}save-query`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ queriesUpdated }),
        }
      );

      if (response.ok) {
        toast.success("Queries updated successfully!");
      } else {
        toast.error("Failed to update queries.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the queries.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-8">
        <Card>
          <CardHeader>
            <CardTitle>Data Generation Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="prompts">Edit Prompts</TabsTrigger>
                <TabsTrigger value="perigon">Perigon Queries</TabsTrigger>
              </TabsList>
              <TabsContent value="prompts">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="module-select" className="block text-sm font-medium text-gray-700">
                      Select Module
                    </label>
                    <Select value={selectedModule} onValueChange={handleModuleChange}>
                      <SelectTrigger id="module-select">
                        <SelectValue placeholder="Select a module" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(config).map((module) => (
                          <SelectItem key={module} value={module}>
                            {module.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
                      Prompt
                    </label>
                    <Textarea
                      id="prompt"
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <Button onClick={handlePromptUpdate}>Update Prompts</Button>
                </div>
              </TabsContent>
              <TabsContent value="perigon">
                <div className="space-y-6">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <label htmlFor="data-module-select" className="block text-sm font-medium text-gray-700">
                        Data Module
                      </label>
                      <Select value={selectedDataModule} onValueChange={handleDataModuleChange}>
                        <SelectTrigger id="data-module-select">
                          <SelectValue placeholder="Select a data module" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(config).map((module) => (
                            <SelectItem key={module} value={module}>
                              {module.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-3">
                      <label htmlFor="data-module-query" className="block text-sm font-medium text-gray-700">
                        Query
                      </label>
                      <Textarea
                        id="data-module-query"
                        value={dataModuleQuery}
                        onChange={(e) => setDataModuleQuery(e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <label htmlFor="sector-select" className="block text-sm font-medium text-gray-700">
                        Sector
                      </label>
                      <Select value={selectedSector} onValueChange={handleSectorChange}>
                        <SelectTrigger id="sector-select">
                          <SelectValue placeholder="Select a sector" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(sectorQueries).map((sector) => (
                            <SelectItem key={sector} value={sector}>
                              {sector.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-3">
                      <label htmlFor="sector-query" className="block text-sm font-medium text-gray-700">
                        Query
                      </label>
                      <Textarea
                        id="sector-query"
                        value={sectorQuery}
                        onChange={(e) => setSectorQuery(e.target.value)}
                        rows={4}
                      />
                    </div>
                  </div>
                  <Button onClick={handleQueryUpdate}>Update Queries</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataGenerationTool;