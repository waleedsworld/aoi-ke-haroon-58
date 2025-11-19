import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "es" | "en";

const STORAGE_KEY = "aoi-studio.language";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "es";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "es" || stored === "en") return stored;
  // Fall back to the browser's preferred language when we have no saved choice.
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : "es";
}

interface Translations {
  [key: string]: {
    es: string;
    en: string;
  };
}

const translations: Translations = {
  // Landing page
  "hero.title": {
    es: "plataforma creativa habilitada por IA",
    en: "AI-powered creative platform"
  },
  "hero.mobile": {
    es: "Aplicación móvil",
    en: "Mobile App"
  },
  "chat.title": {
    es: "Charla en la taberna",
    en: "Chat in the Tavern"
  },
  "chat.desc": {
    es: "Vive experiencias interactivas de rol, conversaciones significativas y aventuras sin fin con tus personajes de anime favoritos.",
    en: "Live interactive role-playing experiences, meaningful conversations and endless adventures with your favorite anime characters."
  },
  "image.title": {
    es: "Generación de imágenes",
    en: "Image Generation"
  },
  "image.desc": {
    es: "Desata tu creatividad con nuestro Generador de Imágenes: da vida a tus personajes y redefine el arte de la creación.",
    en: "Unleash your creativity with our Image Generator: bring your characters to life and redefine the art of creation."
  },
  "video.title": {
    es: "Generación de vídeo",
    en: "Video Generation"
  },
  "video.desc": {
    es: "Crea vídeos de alta calidad y da vida a tus personajes.",
    en: "Create high-quality videos and bring your characters to life."
  },
  "publications.title": {
    es: "Publicaciones",
    en: "Publications"
  },
  "publications.desc": {
    es: "Explora y colecciona imágenes y vídeos creados por la comunidad, todo en un espacio vibrante.",
    en: "Explore and collect images and videos created by the community, all in one vibrant space."
  },
  "models.title": {
    es: "Centro de modelos",
    en: "Model Hub"
  },
  "models.desc": {
    es: "Sube tus modelos favoritos sin esfuerzo para crear impresionantes obras de arte con IA en miles de estilos de anime diferentes.",
    en: "Upload your favorite models effortlessly to create stunning AI artwork in thousands of different anime styles."
  },
  "tavern.title": {
    es: "Taberna",
    en: "Tavern"
  },
  "tavern.subtitle": {
    es: "Desbloquea un mundo de rol sin límites: crea historias, explora mundos y chatea con millones de personajes de anime gracias a LLM como GLM-4.6, Claude Sonnet-4.5, DeepSeek V3.1 y Gemini 2.5 Pro.",
    en: "Unlock a world of limitless role-playing: create stories, explore worlds and chat with millions of anime characters thanks to LLM like GLM-4.6, Claude Sonnet-4.5, DeepSeek V3.1 and Gemini 2.5 Pro."
  },
  "tavern.available": {
    es: "Compañeros de IA disponibles las 24 horas del día, los 7 días",
    en: "AI Companions available 24/7"
  },
  "tavern.create": {
    es: "Crear personaje",
    en: "Create character"
  },
  "tavern.voice": {
    es: "Voz clon",
    en: "Voice clone"
  },
  "tavern.books": {
    es: "Crear libros de saber",
    en: "Create knowledge books"
  },
  "tavern.image": {
    es: "Imagen en el chat",
    en: "Image in chat"
  },
  "tavern.chat": {
    es: "Charlar",
    en: "Chat"
  },
  // Video generator
  "video.empty": {
    es: "Vacío",
    en: "Empty"
  },
  "video.start": {
    es: "Comienza tu primer contenido creativo.",
    en: "Start your first creative content."
  },
  "video.example": {
    es: "Ejemplo",
    en: "Example"
  },
  "video.firstFrame": {
    es: "Primer Fotograma",
    en: "First Frame"
  },
  "video.selectImage": {
    es: "Selecciona una imagen y úsala como primer fotograma del vídeo",
    en: "Select an image and use it as the first frame of the video"
  },
  "video.addImage": {
    es: "Agregar imagen",
    en: "Add image"
  },
  "video.prompt": {
    es: "Refiere a la imagen y describe el proceso dinámico deseado.",
    en: "Refer to the image and describe the desired dynamic process."
  },
  "video.models": {
    es: "Modelos",
    en: "Models"
  },
  "video.imageToVideo": {
    es: "Imagen a Video",
    en: "Image to Video"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // Persist the choice and keep the document's lang attribute in sync (a11y + SEO).
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
