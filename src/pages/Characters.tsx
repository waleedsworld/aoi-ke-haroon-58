import { MainLayout } from "@/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Plus } from "lucide-react";

// Mock character data with images
const mockCharacters = [
  {
    id: 1,
    name: "Luna",
    race: "Elf",
    gender: "Female",
    hairColor: "Silver",
    eyeColor: "Blue",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop",
    category: "Fantasy"
  },
  {
    id: 2,
    name: "Marcus",
    race: "Human",
    gender: "Male",
    hairColor: "Black",
    eyeColor: "Green",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    category: "Adventure"
  },
  {
    id: 3,
    name: "Aria",
    race: "Demon",
    gender: "Female",
    hairColor: "Red",
    eyeColor: "Purple",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop",
    category: "Dark Fantasy"
  },
  {
    id: 4,
    name: "Sakura",
    race: "Human",
    gender: "Female",
    hairColor: "Pink",
    eyeColor: "Green",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
    category: "Anime"
  },
  {
    id: 5,
    name: "Kiryuu",
    race: "Elf",
    gender: "Female",
    hairColor: "Black",
    eyeColor: "Red",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    category: "Roleplay"
  },
  {
    id: 6,
    name: "Yuki",
    race: "Human",
    gender: "Female",
    hairColor: "White",
    eyeColor: "Blue",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop",
    category: "Winter"
  },
];

export default function Characters() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Characters</h1>
            <p className="text-muted-foreground">
              Manage and interact with your created characters
            </p>
          </div>
          <Button onClick={() => navigate("/create/quick")} className="gap-2">
            <Plus className="w-4 h-4" />
            Create New
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockCharacters.map((character) => (
            <Card
              key={character.id}
              className="overflow-hidden hover:scale-105 transition-all cursor-pointer hover-glow bg-card/50 backdrop-blur border-border/50"
            >
              <div className="aspect-[2/3] relative">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4">
                  <h3 className="text-xl font-bold mb-2 text-white">{character.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">{character.category}</Badge>
                    <Badge variant="secondary" className="text-xs">{character.race}</Badge>
                    <Badge variant="outline" className="text-xs border-white/30 text-white">{character.gender}</Badge>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <Button className="w-full gap-2" onClick={() => navigate("/chat")}>
                  <MessageSquare className="w-4 h-4" />
                  Chat with {character.name}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
