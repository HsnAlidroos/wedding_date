import { useState } from 'react';
import { CountdownTimer } from '@/app/components/CountdownTimer';
import { LanguageToggle } from '@/app/components/LanguageToggle';
import { DatePicker } from '@/app/components/DatePicker';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState('en');
  // Default wedding date: 6 months from now
  const defaultDate = new Date();
  defaultDate.setMonth(defaultDate.getMonth() + 6);
  const [weddingDate, setWeddingDate] = useState(defaultDate.toISOString());

  const handleDateSelect = (newDate) => {
    setWeddingDate(newDate);
  };

  const text = {
    en: {
      title: 'Our Wedding',
      subtitle: 'Counting down to our special day',
      footer: 'Made with love'
    },
    ar: {
      title: 'حفل زفافنا',
      subtitle: 'العد التنازلي ليومنا الخاص',
      footer: 'صنع بحب'
    }
  };

  const currentText = text[language] || text.en;
  const isRTL = language === 'ar';

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-[#F5F3EE] via-[#FBF9F4] to-[#F0EDE5] flex flex-col"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <header className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-[#D4AF37] fill-[#D4AF37]" />
            <span 
              className="text-xl md:text-2xl text-[#2C2C2C]"
              style={{ fontFamily: isRTL ? 'Amiri, serif' : 'Playfair Display, serif' }}
            >
              {currentText.title}
            </span>
          </motion.div>
          <LanguageToggle language={language} onLanguageChange={setLanguage} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12">
        <div className="max-w-6xl w-full text-center">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 md:mb-16"
          >
            <h1 
              className="text-4xl md:text-6xl lg:text-7xl mb-4 text-[#2C2C2C]"
              style={{ fontFamily: isRTL ? 'Amiri, serif' : 'Playfair Display, serif' }}
            >
              {currentText.title}
            </h1>
            <p 
              className="text-lg md:text-xl text-[#8B7355]"
              style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'Inter, sans-serif' }}
            >
              {currentText.subtitle}
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12 md:mb-16"
          >
            <CountdownTimer targetDate={weddingDate} language={language} />
          </motion.div>

          {/* Date Picker Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <DatePicker onDateSelect={handleDateSelect} language={language} />
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 md:mt-16 flex justify-center gap-2"
          >
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
            <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center">
        <motion.p 
          className="text-sm text-[#8B7355] flex items-center justify-center gap-2"
          style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'Inter, sans-serif' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          {currentText.footer} <Heart className="w-3 h-3 text-[#D4AF37] fill-[#D4AF37]" />
        </motion.p>
      </footer>
    </div>
  );
}
