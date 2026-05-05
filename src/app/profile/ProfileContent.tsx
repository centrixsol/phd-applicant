"use client";
import { useEffect, useState } from "react";
import { Save, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RESEARCH_AREAS } from "@/lib/utils";

interface Profile {
  firstName: string; lastName: string; email: string; phone: string;
  nationality: string; dateOfBirth: string; address: string; city: string; country: string;
  linkedin: string; github: string; website: string;
  undergradUniv: string; undergradDegree: string; undergradGPA: string; undergradYear: string;
  masterUniv: string; masterDegree: string; masterGPA: string; masterYear: string;
  greVerbal: string; greQuant: string; greAWA: string; toeflScore: string; ieltsScore: string;
  publications: string; researchExp: string; workExperience: string; skills: string; awards: string;
  interestedAreas: string[];
}

const empty: Profile = {
  firstName: "", lastName: "", email: "", phone: "", nationality: "", dateOfBirth: "",
  address: "", city: "", country: "", linkedin: "", github: "", website: "",
  undergradUniv: "", undergradDegree: "", undergradGPA: "", undergradYear: "",
  masterUniv: "", masterDegree: "", masterGPA: "", masterYear: "",
  greVerbal: "", greQuant: "", greAWA: "", toeflScore: "", ieltsScore: "",
  publications: "", researchExp: "", workExperience: "", skills: "", awards: "",
  interestedAreas: [],
};

export default function ProfileContent() {
  const [profile, setProfile] = useState<Profile>(empty);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [completeness, setCompleteness] = useState(0);

  useEffect(() => {
    fetch("/api/profile").then((r) => r.json()).then((data) => {
      setProfile({ ...empty, ...Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v ?? ""])), interestedAreas: data.interestedAreas || [] });
    });
  }, []);

  useEffect(() => {
    const fields = [profile.firstName, profile.lastName, profile.phone, profile.nationality,
      profile.undergradUniv, profile.undergradGPA, profile.researchExp,
      profile.interestedAreas.length > 0 ? "filled" : ""];
    setCompleteness(Math.round((fields.filter(Boolean).length / fields.length) * 100));
  }, [profile]);

  const set = (key: keyof Profile, value: string) => setProfile((prev) => ({ ...prev, [key]: value }));

  function toggleArea(area: string) {
    setProfile((prev) => ({
      ...prev,
      interestedAreas: prev.interestedAreas.includes(area)
        ? prev.interestedAreas.filter((a) => a !== area)
        : [...prev.interestedAreas, area],
    }));
  }

  async function save() {
    setSaving(true);
    await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...profile,
        undergradGPA: profile.undergradGPA ? parseFloat(profile.undergradGPA) : null,
        masterGPA: profile.masterGPA ? parseFloat(profile.masterGPA) : null,
        undergradYear: profile.undergradYear ? parseInt(profile.undergradYear) : null,
        masterYear: profile.masterYear ? parseInt(profile.masterYear) : null,
        greVerbal: profile.greVerbal ? parseInt(profile.greVerbal) : null,
        greQuant: profile.greQuant ? parseInt(profile.greQuant) : null,
        greAWA: profile.greAWA ? parseFloat(profile.greAWA) : null,
        toeflScore: profile.toeflScore ? parseInt(profile.toeflScore) : null,
        ieltsScore: profile.ieltsScore ? parseFloat(profile.ieltsScore) : null,
      }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function Field({ label, k, type = "text", placeholder = "" }: { label: string; k: keyof Profile; type?: string; placeholder?: string }) {
    return (
      <div className="space-y-1">
        <Label className="text-xs">{label}</Label>
        <Input type={type} value={profile[k] as string} onChange={(e) => set(k, e.target.value)} placeholder={placeholder} />
      </div>
    );
  }

  function TextareaField({ label, k, placeholder = "", rows = 4 }: { label: string; k: keyof Profile; placeholder?: string; rows?: number }) {
    return (
      <div className="space-y-1">
        <Label className="text-xs">{label}</Label>
        <Textarea rows={rows} value={profile[k] as string} onChange={(e) => set(k, e.target.value)} placeholder={placeholder} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1">This information will be used to auto-fill your PhD applications</p>
        </div>
        <Button onClick={save} disabled={saving} size="lg">
          {saved ? <><CheckCircle className="w-4 h-4 mr-2" /> Saved!</> : <><Save className="w-4 h-4 mr-2" />{saving ? "Saving..." : "Save Profile"}</>}
        </Button>
      </div>

      <div className="mb-6 p-4 bg-white border rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Profile Completeness</span>
          <span className="text-sm font-bold text-blue-600">{completeness}%</span>
        </div>
        <Progress value={completeness} />
        {completeness < 100 && <p className="text-xs text-gray-500 mt-1">Complete your profile to enable Auto-Apply</p>}
      </div>

      <Tabs defaultValue="personal">
        <TabsList className="mb-6 flex flex-wrap h-auto gap-1">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="tests">Test Scores</TabsTrigger>
          <TabsTrigger value="research">Research & Work</TabsTrigger>
          <TabsTrigger value="interests">Research Interests</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <Field label="First Name *" k="firstName" placeholder="John" />
              <Field label="Last Name *" k="lastName" placeholder="Doe" />
              <Field label="Email *" k="email" type="email" placeholder="john@example.com" />
              <Field label="Phone" k="phone" placeholder="+1 234 567 8900" />
              <Field label="Nationality" k="nationality" placeholder="American" />
              <Field label="Date of Birth" k="dateOfBirth" type="date" />
              <Field label="City" k="city" placeholder="New York" />
              <Field label="Country" k="country" placeholder="USA" />
              <div className="md:col-span-2">
                <Field label="Address" k="address" placeholder="123 Main Street, Apt 4B" />
              </div>
              <Field label="LinkedIn Profile" k="linkedin" placeholder="https://linkedin.com/in/..." />
              <Field label="GitHub Profile" k="github" placeholder="https://github.com/..." />
              <div className="md:col-span-2">
                <Field label="Personal Website / Portfolio" k="website" placeholder="https://yoursite.com" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="academic">
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Undergraduate Education</CardTitle></CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Field label="University Name *" k="undergradUniv" placeholder="University of Example" />
                </div>
                <Field label="Degree" k="undergradDegree" placeholder="B.Sc. in Computer Science" />
                <Field label="GPA / Grade *" k="undergradGPA" type="number" placeholder="3.8" />
                <Field label="Graduation Year" k="undergradYear" type="number" placeholder="2022" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Master&apos;s Education (if applicable)</CardTitle></CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Field label="University Name" k="masterUniv" placeholder="Graduate University" />
                </div>
                <Field label="Degree" k="masterDegree" placeholder="M.Sc. in Machine Learning" />
                <Field label="GPA / Grade" k="masterGPA" type="number" placeholder="3.9" />
                <Field label="Graduation Year" k="masterYear" type="number" placeholder="2024" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tests">
          <div className="space-y-6">
            <Card>
              <CardHeader><CardTitle>GRE Scores (if applicable)</CardTitle></CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-4">
                <Field label="Verbal Reasoning" k="greVerbal" type="number" placeholder="165" />
                <Field label="Quantitative Reasoning" k="greQuant" type="number" placeholder="170" />
                <Field label="Analytical Writing" k="greAWA" type="number" placeholder="5.0" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>English Proficiency</CardTitle></CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <Field label="TOEFL Score" k="toeflScore" type="number" placeholder="110" />
                <Field label="IELTS Score" k="ieltsScore" type="number" placeholder="8.0" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="research">
          <Card>
            <CardHeader><CardTitle>Research & Professional Experience</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <TextareaField label="Research Experience *" k="researchExp" rows={5} placeholder="Describe your research experience, projects, labs, and contributions..." />
              <TextareaField label="Publications & Papers" k="publications" rows={4} placeholder="List publications, conference papers, preprints, or ongoing research..." />
              <TextareaField label="Work Experience" k="workExperience" rows={4} placeholder="Industry experience, internships, full-time positions..." />
              <TextareaField label="Technical Skills" k="skills" rows={3} placeholder="Python, PyTorch, TensorFlow, JAX, R, MATLAB, Docker, cloud platforms..." />
              <TextareaField label="Awards & Honors" k="awards" rows={3} placeholder="Scholarships, academic awards, competition results, fellowships..." />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interests">
          <Card>
            <CardHeader>
              <CardTitle>Research Interests</CardTitle>
              <p className="text-sm text-gray-500">Select the ML & AI areas you&apos;re most interested in pursuing for your PhD</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {RESEARCH_AREAS.map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleArea(area)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all border ${
                      profile.interestedAreas.includes(area)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
              {profile.interestedAreas.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700 font-medium mb-2">Selected ({profile.interestedAreas.length}):</p>
                  <div className="flex flex-wrap gap-1">
                    {profile.interestedAreas.map((a) => <Badge key={a} variant="info">{a}</Badge>)}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex justify-end">
        <Button onClick={save} disabled={saving} size="lg">
          {saved ? <><CheckCircle className="w-4 h-4 mr-2" /> Profile Saved!</> : <><Save className="w-4 h-4 mr-2" />{saving ? "Saving..." : "Save Profile"}</>}
        </Button>
      </div>
    </div>
  );
}
