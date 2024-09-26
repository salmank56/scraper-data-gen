import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FaPlus } from 'react-icons/fa';

const formSchema = z.object({
  csvFile: z.instanceof(File).optional(),
  sector: z.string().min(1, "Sector is required"),
  dataModule: z.string().min(1, "Data Module is required"),
  exportFrequency: z.string().min(1, "Export Frequency is required"),
  timePeriod: z.string().min(1, "Time Period is required"),
});

type FormSchema = z.infer<typeof formSchema>;

const AddDataGenTaskModal: React.FC<{ onAddTask: () => void }> = ({ onAddTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sector: "",
      dataModule: "",
      exportFrequency: "",
      timePeriod: "",
    },
  });

  const onSubmit = async (values: FormSchema) => {
    setIsLoading(true);
    const formData = new FormData();
    if (values.csvFile) {
      formData.append('csv_file', values.csvFile);
    }
    formData.append('sector', values.sector);
    formData.append('data_module', values.dataModule);
    formData.append('export_frequency', values.exportFrequency);
    formData.append('time_period', values.timePeriod);

    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_GEN_BASE_URL}add_scheduled_export`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add scheduled export');
      }

      console.log('Scheduled export added successfully');
      setIsOpen(false);
      onAddTask();
    } catch (error) {
      console.error('Error adding scheduled export:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          className="flex items-center gap-2 px-4 py-2 mr-2 text-white bg-teal-600 rounded"
        >
          <FaPlus /> <span>Add Task</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Scheduled Export</DialogTitle>
          <DialogDescription>
            Set up a new scheduled export task. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="csvFile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CSV File (optional):</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".csv"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sector:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="space">Space</SelectItem>
                      <SelectItem value="quantum">Quantum</SelectItem>
                      <SelectItem value="other">Other sectors...</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dataModule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data Module:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select data module" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="management_change">Management Change</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="other">Other modules...</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="exportFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Export Frequency:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select export frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="one-time">One Time</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timePeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Period:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time period" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1d">1 Day</SelectItem>
                      <SelectItem value="1w">1 Week</SelectItem>
                      <SelectItem value="1m">1 Month</SelectItem>
                      <SelectItem value="3m">3 Months</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Start Export'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDataGenTaskModal;
