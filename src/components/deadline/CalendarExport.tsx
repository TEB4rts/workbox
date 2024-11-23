import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { toast } from "sonner";

interface CalendarExportProps {
  projectName: string;
  startDate: string;
  endDate: Date;
}

export const CalendarExport = ({ projectName, startDate, endDate }: CalendarExportProps) => {
  const generateICSContent = () => {
    const event = {
      title: `${projectName} Deadline`,
      start: new Date(startDate).toISOString(),
      end: endDate.toISOString(),
    };

    return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${event.start.replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${event.end.replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${event.title}
END:VEVENT
END:VCALENDAR`;
  };

  const handleExport = () => {
    const icsContent = generateICSContent();
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${projectName}-deadline.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    toast.success("Calendar event exported successfully!");
  };

  return (
    <Button 
      className="w-full dark:bg-gray-700 dark:text-gray-200"
      variant="outline"
      onClick={handleExport}
    >
      <Calendar className="mr-2 h-4 w-4" />
      Export to Calendar
    </Button>
  );
};