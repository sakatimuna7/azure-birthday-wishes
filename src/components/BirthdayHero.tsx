import { Cake, Star, Sparkles } from "lucide-react";
import bossPhoto from "@/assets/boss-photo.jpg";

const BirthdayHero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 animate-float">
          <Star className="w-8 h-8 text-accent opacity-60" />
        </div>
        <div className="absolute top-40 right-32 animate-float" style={{ animationDelay: '1s' }}>
          <Sparkles className="w-6 h-6 text-accent opacity-80" />
        </div>
        <div className="absolute bottom-32 left-16 animate-float" style={{ animationDelay: '2s' }}>
          <Star className="w-10 h-10 text-accent opacity-50" />
        </div>
        <div className="absolute bottom-20 right-20 animate-float" style={{ animationDelay: '0.5s' }}>
          <Sparkles className="w-8 h-8 text-accent opacity-70" />
        </div>
      </div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Image */}
          <div className="relative inline-block animate-scale-in">
            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden shadow-glow ring-4 ring-accent/30">
              <img 
                src={bossPhoto} 
                alt="Happy Birthday Boss" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-2 -right-2">
              <Cake className="w-12 h-12 text-accent animate-bounce" />
            </div>
          </div>
          
          {/* Main Message */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <h1 className="text-6xl md:text-7xl font-bold text-primary-foreground leading-tight">
              Selamat
              <span className="block bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                Ulang Tahun!
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Semoga di hari spesial ini, kebahagiaan selalu menyertai langkah Anda. 
              Terima kasih atas kepemimpinan dan inspirasi yang luar biasa.
            </p>
          </div>
          
          {/* Decorative Border */}
          <div className="flex justify-center animate-slide-up" style={{ animationDelay: '600ms' }}>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayHero;