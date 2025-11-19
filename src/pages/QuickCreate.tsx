import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const steps = [
  "Name & Age",
  "Gender & Race",
  "Body Type",
  "Hair Style",
  "Colors",
  "Summary",
];

const genderOptions = [
  { id: "female", label: "Female", emoji: "👩" },
  { id: "male", label: "Male", emoji: "👨" },
];

const raceOptions = [
  { id: "human", label: "Human" },
  { id: "werewolf", label: "Werewolf" },
  { id: "elf", label: "Elf" },
  { id: "demon", label: "Demon" },
  { id: "vampire", label: "Vampire" },
  { id: "angel", label: "Angel" },
];

const bodyTypes = ["Slim", "Athletic", "Curvy", "Voluptuous"];
const hairStyles = ["Straight", "Wavy", "Curly", "Braids", "Ponytail", "Short", "Long", "Bun"];
const colors = ["Red", "Orange", "Blonde", "Green", "Blue", "Purple", "Brown", "Black", "Grey", "White"];

export default function QuickCreate() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    age: "Adult",
    gender: "",
    race: "",
    bodyType: "",
    hairStyle: "",
    eyeColor: "",
    hairColor: "",
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    // Mock save
    toast({
      title: "Character Created!",
      description: `${formData.name} has been saved to your library.`,
    });
    setTimeout(() => navigate("/characters"), 1500);
  };

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <Card className="p-8 bg-card/50 backdrop-blur border-border/50">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
              Quick Character Creation
            </h1>
            <p className="text-center text-muted-foreground mb-6">
              {steps[currentStep]}
            </p>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index <= currentStep ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="min-h-[400px] mb-8">
            {/* Step 0: Name & Age */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-base mb-2 block">
                    Character Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter character name..."
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="text-lg"
                  />
                </div>
                <div>
                  <Label className="text-base mb-3 block">Age Group</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Adult", "Middle", "Old"].map((age) => (
                      <Button
                        key={age}
                        variant={formData.age === age ? "default" : "outline"}
                        className="h-16"
                        onClick={() => updateField("age", age)}
                      >
                        {age}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Gender & Race */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base mb-3 block">Gender</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {genderOptions.map((option) => (
                      <Card
                        key={option.id}
                        className={`p-6 cursor-pointer text-center transition-all hover:scale-105 ${
                          formData.gender === option.id
                            ? "border-primary border-2"
                            : "border-border"
                        }`}
                        onClick={() => updateField("gender", option.id)}
                      >
                        <div className="text-4xl mb-2">{option.emoji}</div>
                        <p className="font-semibold">{option.label}</p>
                      </Card>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-base mb-3 block">Race</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {raceOptions.map((race) => (
                      <Button
                        key={race.id}
                        variant={formData.race === race.id ? "default" : "outline"}
                        onClick={() => updateField("race", race.id)}
                      >
                        {race.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Body Type */}
            {currentStep === 2 && (
              <div>
                <Label className="text-base mb-4 block">Choose Body Type</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {bodyTypes.map((type) => (
                    <Card
                      key={type}
                      className={`p-6 cursor-pointer text-center transition-all hover:scale-105 ${
                        formData.bodyType === type
                          ? "border-primary border-2"
                          : "border-border"
                      }`}
                      onClick={() => updateField("bodyType", type)}
                    >
                      <div className="w-full h-32 bg-muted rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-3xl">👤</span>
                      </div>
                      <p className="font-semibold">{type}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Hair Style */}
            {currentStep === 3 && (
              <div>
                <Label className="text-base mb-4 block">Choose Hair Style</Label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                  {hairStyles.map((style) => (
                    <Card
                      key={style}
                      className={`p-4 cursor-pointer text-center transition-all hover:scale-105 ${
                        formData.hairStyle === style
                          ? "border-primary border-2"
                          : "border-border"
                      }`}
                      onClick={() => updateField("hairStyle", style)}
                    >
                      <div className="w-full h-20 bg-muted rounded-lg mb-2 flex items-center justify-center">
                        <span className="text-2xl">💇</span>
                      </div>
                      <p className="text-sm font-medium">{style}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Colors */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base mb-3 block">Elegir color de ojos</Label>
                  <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                    {colors.slice(0, 9).map((color) => {
                      const colorMap: Record<string, string> = {
                        Red: "bg-red-500",
                        Orange: "bg-orange-500",
                        Gold: "bg-yellow-500",
                        Green: "bg-green-500",
                        Blue: "bg-blue-500",
                        Purple: "bg-purple-500",
                        Brown: "bg-amber-700",
                        Black: "bg-gray-900",
                        Grey: "bg-gray-500"
                      };
                      return (
                        <button
                          key={`eye-${color}`}
                          type="button"
                          onClick={() => updateField("eyeColor", color)}
                          className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all ${
                            formData.eyeColor === color ? "scale-105" : "hover:scale-105"
                          }`}
                        >
                          <div className={`w-16 h-16 rounded-full ${colorMap[color]} border-4 border-background shadow-lg flex items-center justify-center relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-gradient-radial from-white/40 to-transparent"></div>
                            <div className="w-8 h-8 rounded-full bg-black/80"></div>
                          </div>
                          <span className="text-xs font-medium">{color}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <Label className="text-base mb-3 block">Elegir color de cabello</Label>
                  <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
                    {colors.map((color) => {
                      const colorMap: Record<string, string> = {
                        Red: "bg-red-500",
                        Orange: "bg-orange-500",
                        Gold: "bg-yellow-500",
                        Green: "bg-green-500",
                        Blue: "bg-blue-500",
                        Purple: "bg-purple-500",
                        Brown: "bg-amber-700",
                        Black: "bg-gray-900",
                        Grey: "bg-gray-500",
                        White: "bg-gray-100"
                      };
                      return (
                        <button
                          key={`hair-${color}`}
                          type="button"
                          onClick={() => updateField("hairColor", color)}
                          className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all ${
                            formData.hairColor === color ? "scale-105" : "hover:scale-105"
                          }`}
                        >
                          <div className={`w-16 h-16 rounded-full ${colorMap[color]} border-4 border-background shadow-lg relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-white/30"></div>
                          </div>
                          <span className="text-xs font-medium">{color}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Summary */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-center mb-6">Character Summary</h3>
                <Card className="p-6 bg-muted/30">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-semibold">{formData.name || "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-semibold">{formData.age}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p className="font-semibold capitalize">{formData.gender || "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Race</p>
                      <p className="font-semibold capitalize">{formData.race || "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Body Type</p>
                      <p className="font-semibold">{formData.bodyType || "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Hair Style</p>
                      <p className="font-semibold">{formData.hairStyle || "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Eye Color</p>
                      <p className="font-semibold">{formData.eyeColor || "Not set"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Hair Color</p>
                      <p className="font-semibold">{formData.hairColor || "Not set"}</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext} className="flex-1">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSave} className="flex-1 bg-primary">
                <Check className="w-4 h-4 mr-2" />
                Save Character
              </Button>
            )}
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
