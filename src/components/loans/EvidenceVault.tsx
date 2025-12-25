import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Image, X, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface UploadedFile {
  id: string;
  name: string;
  type: "pdf" | "image";
  size: string;
  uploadedAt: string;
}

const existingFiles: UploadedFile[] = [
  { id: "1", name: "Invoice_Solar_Panels.pdf", type: "pdf", size: "2.4 MB", uploadedAt: "Dec 20, 2024" },
  { id: "2", name: "Site_Photo_North.jpg", type: "image", size: "1.8 MB", uploadedAt: "Dec 19, 2024" },
  { id: "3", name: "Construction_Permit.pdf", type: "pdf", size: "856 KB", uploadedAt: "Dec 15, 2024" },
];

export function EvidenceVault() {
  const [files, setFiles] = useState<UploadedFile[]>(existingFiles);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const newFiles: UploadedFile[] = droppedFiles.map((file, index) => ({
      id: `new-${Date.now()}-${index}`,
      name: file.name,
      type: file.type.includes("pdf") ? "pdf" : "image",
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      uploadedAt: "Just now",
    }));
    
    setFiles((prev) => [...newFiles, ...prev]);
  }, []);

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Upload className="w-5 h-5 text-emerald" />
          Evidence Vault
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200",
            isDragging
              ? "border-emerald bg-emerald/5 scale-[1.02]"
              : "border-border hover:border-emerald/50 hover:bg-secondary/30"
          )}
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center transition-colors",
                isDragging ? "emerald-gradient" : "bg-secondary"
              )}
            >
              <Upload
                className={cn(
                  "w-6 h-6 transition-colors",
                  isDragging ? "text-accent-foreground" : "text-muted-foreground"
                )}
              />
            </div>
            <div>
              <p className="font-medium">
                {isDragging ? "Drop files here" : "Drag & drop files here"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                PDF invoices, site photos, or construction documents
              </p>
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              Browse Files
            </Button>
          </div>
        </div>

        {/* Uploaded Files */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">
            Uploaded Documents ({files.length})
          </p>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={file.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-200 group",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    file.type === "pdf"
                      ? "bg-red-500/10 text-red-500"
                      : "bg-blue-500/10 text-blue-500"
                  )}
                >
                  {file.type === "pdf" ? (
                    <FileText className="w-5 h-5" />
                  ) : (
                    <Image className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {file.size} • {file.uploadedAt}
                  </p>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeFile(file.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
