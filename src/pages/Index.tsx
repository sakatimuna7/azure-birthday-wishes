import BirthdayHero from "@/components/BirthdayHero";
import BirthdayCard from "@/components/BirthdayCard";
import { Users, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Message = {
  name: string;
  message: string;
};

const Index = () => {
  const [birthdayMessages, setBirthdayMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const snapshot = await getDocs(collection(db, "birthdayMessages"));
        const data = snapshot.docs.map((doc) => doc.data()) as Message[];
        setBirthdayMessages(data);
      } catch (err) {
        console.error("Gagal ambil data ucapan:", err);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <BirthdayHero />

      {/* Messages Section */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 animate-slide-up">
              <div className="flex justify-center items-center space-x-3 mb-4">
                <Users className="w-8 h-8 text-primary" />
                <h2 className="text-4xl font-bold text-elegant">
                  Ucapan dari Tim
                </h2>
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Setiap kata ini datang dari hati kami yang tulus, sebagai bentuk
                apresiasi atas kepemimpinan dan dedikasi yang luar biasa.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {birthdayMessages.map((message, index) => (
                <BirthdayCard
                  key={index}
                  name={message.name}
                  message={message.message}
                  delay={index * 150}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-elegant py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="space-y-4">
            <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
            <p className="text-elegant-foreground/80 text-lg">
              Dengan cinta dan hormat, dari seluruh tim
            </p>
            <div className="flex justify-center space-x-2">
              <Heart className="w-5 h-5 text-accent animate-pulse" />
              <Heart
                className="w-5 h-5 text-accent animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <Heart
                className="w-5 h-5 text-accent animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
