"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Note = {
  id: string;
  name: string;
  phone: string;
  email: string;
  cid: string;
  vid: string;
  dsn: string;
  obcModel: string;
  icapid: string;
  icapidModel: string;
  symptom: string;
  troubleshooting: string;
  resolution: string;
  timestamp: string;
};

export default function CustomerNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Partial<Note>>({});
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const savedNotes = localStorage.getItem("customerNotes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }

    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    };

    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("customerNotes", JSON.stringify(notes));
  }, [notes]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentNote({ ...currentNote, [e.target.name]: e.target.value });
  };

  const createNewNote = () => {
    if (Object.values(currentNote).some((value) => value === "")) {
      alert("Please fill in all fields");
      return;
    }

    const newNote: Note = {
      ...(currentNote as Note),
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
    };

    setNotes([...notes, newNote]);
    setCurrentNote({});
  };

  const deleteAllNotes = () => {
    setNotes([]);
    localStorage.removeItem("customerNotes");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">
          Customer Information
        </h1>
        <p className="text-center mb-6 text-gray-600 dark:text-gray-400">
          {currentDateTime}
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>New Note</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Basic Information */}
              <div className="space-y-2">
                <Label htmlFor="name">Customer Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  value={currentNote.name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter phone"
                  value={currentNote.phone || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={currentNote.email || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* System Information */}
              <div className="space-y-2">
                <Label htmlFor="cid">CID</Label>
                <Input
                  id="cid"
                  name="cid"
                  placeholder="Enter CID"
                  value={currentNote.cid || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vid">VID</Label>
                <Input
                  id="vid"
                  name="vid"
                  placeholder="Enter VID"
                  value={currentNote.vid || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dsn">DSN</Label>
                <Input
                  id="dsn"
                  name="dsn"
                  placeholder="Enter DSN"
                  value={currentNote.dsn || ""}
                  onChange={handleInputChange}
                />
              </div>

              {/* Device Information */}
              <div className="space-y-2">
                <Label htmlFor="obcModel">OBC Model</Label>
                <Input
                  id="obcModel"
                  name="obcModel"
                  placeholder="Enter OBC Version"
                  value={currentNote.obcModel || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icapid">ICAPID</Label>
                <Input
                  id="icapid"
                  name="icapid"
                  placeholder="Enter ICAPID"
                  value={currentNote.icapid || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="icapidModel">Tablet Version</Label>
                <Input
                  id="icapidModel"
                  name="icapidModel"
                  placeholder="Enter Tablet Version"
                  value={currentNote.icapidModel || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Textareas */}
            <div className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="symptom">Symptom/Issue: </Label>
                <Textarea
                  id="symptom"
                  name="symptom"
                  placeholder="Describe the symptom or issue"
                  value={currentNote.symptom || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="troubleshooting">
                  Troubleshooting Completed/Solution:
                </Label>
                <Textarea
                  id="troubleshooting"
                  name="troubleshooting"
                  placeholder="Enter troubleshooting steps"
                  value={currentNote.troubleshooting || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resolution">Recommended Steps: </Label>
                <Textarea
                  id="resolution"
                  name="resolution"
                  placeholder="Enter resolution steps"
                  value={currentNote.resolution || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Button onClick={createNewNote} className="mt-6 w-full">
              Add New Customer Note
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <Card key={note.id} className="bg-white dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-lg">{note.name}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {note.timestamp}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <strong>Phone:</strong> {note.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {note.email}
                  </p>
                  <p>
                    <strong>CID:</strong> {note.cid}
                  </p>
                  <p>
                    <strong>VID:</strong> {note.vid}
                  </p>
                  <p>
                    <strong>DSN:</strong> {note.dsn}
                  </p>
                  <p>
                    <strong>OBC Model:</strong> {note.obcModel}
                  </p>
                  <p>
                    <strong>ICAPID:</strong> {note.icapid}
                  </p>
                  <p>
                    <strong>Tablet Version:</strong> {note.icapidModel}
                  </p>
                  <p>
                    <strong>Symptom:</strong> {note.symptom}
                  </p>
                  <p>
                    <strong>Troubleshooting:</strong> {note.troubleshooting}
                  </p>
                  <p>
                    <strong>Resolution:</strong> {note.resolution}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notes.length > 0 && (
          <div className="mt-8 text-center">
            <Button onClick={deleteAllNotes} variant="destructive">
              Refresh The Day
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
