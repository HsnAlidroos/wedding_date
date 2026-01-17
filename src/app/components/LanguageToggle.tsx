import { Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface LanguageToggleProps {
    language: string;
    onLanguageChange: (lang: string) => void;
}

export function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
    return (
        <motion.div
            className="flex items-center gap-2 bg-[#F5F3EE] rounded-full p-1 shadow-md"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Globe className="w-4 h-4 text-[#D4AF37] ml-2" />
            <button
                onClick={() => onLanguageChange('en')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${language === 'en'
                        ? 'bg-[#D4AF37] text-white shadow-md'
                        : 'text-[#2C2C2C] hover:bg-[#E8E6E1]'
                    }`}
            >
                EN
            </button>
            <button
                onClick={() => onLanguageChange('ar')}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${language === 'ar'
                        ? 'bg-[#D4AF37] text-white shadow-md'
                        : 'text-[#2C2C2C] hover:bg-[#E8E6E1]'
                    }`}
                style={{ fontFamily: 'IBM Plex Sans Arabic, sans-serif' }}
            >
                عربي
            </button>
        </motion.div>
    );
}
