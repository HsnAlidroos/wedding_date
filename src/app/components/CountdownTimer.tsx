import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface CountdownTimerProps {
    targetDate: string;
    language: string;
}

export function CountdownTimer({ targetDate, language }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState({
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const target = new Date(targetDate);
            const difference = target.getTime() - now.getTime();

            if (difference > 0) {
                // Calculate total days
                const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));

                // Calculate months (approximate)
                const months = Math.floor(totalDays / 30);
                const remainingDays = totalDays % 30;

                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);

                setTimeLeft({
                    months,
                    days: remainingDays,
                    hours,
                    minutes,
                    seconds
                });
            } else {
                setTimeLeft({
                    months: 0,
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const labels: Record<string, Record<string, string>> = {
        en: {
            months: 'Months',
            days: 'Days',
            hours: 'Hours',
            minutes: 'Minutes',
            seconds: 'Seconds'
        },
        ar: {
            months: 'شهور',
            days: 'أيام',
            hours: 'ساعات',
            minutes: 'دقائق',
            seconds: 'ثواني'
        }
    };

    const currentLabels = labels[language] || labels.en;
    const isRTL = language === 'ar';

    return (
        <div
            className={`flex flex-wrap justify-center gap-4 md:gap-8 ${isRTL ? 'rtl' : 'ltr'}`}
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <TimerUnit value={timeLeft.months} label={currentLabels.months} language={language} />
            <TimerUnit value={timeLeft.days} label={currentLabels.days} language={language} />
            <TimerUnit value={timeLeft.hours} label={currentLabels.hours} language={language} />
            <TimerUnit value={timeLeft.minutes} label={currentLabels.minutes} language={language} />
            <TimerUnit value={timeLeft.seconds} label={currentLabels.seconds} language={language} isSeconds />
        </div>
    );
}

interface TimerUnitProps {
    value: number;
    label: string;
    language: string;
    isSeconds?: boolean;
}

function TimerUnit({ value, label, language, isSeconds = false }: TimerUnitProps) {
    const isRTL = language === 'ar';

    return (
        <div
            className="flex flex-col items-center min-w-[80px] md:min-w-[120px]"
        >
            <div
                className="bg-[#F5F3EE] border-2 border-[#D4AF37] rounded-lg p-4 md:p-6 w-full shadow-lg"
            >
                <motion.div
                    key={value}
                    className={`text-3xl md:text-5xl font-serif text-[#2C2C2C] ${isRTL ? 'font-arabic' : ''}`}
                    style={{ fontFamily: isRTL ? 'Amiri, serif' : 'Playfair Display, serif' }}
                    animate={isSeconds ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    {String(value).padStart(2, '0')}
                </motion.div>
            </div>
            <div
                className={`mt-3 text-sm md:text-base text-[#8B7355] uppercase tracking-wider ${isRTL ? 'font-arabic' : ''}`}
                style={{ fontFamily: isRTL ? 'IBM Plex Sans Arabic, sans-serif' : 'Inter, sans-serif' }}
            >
                {label}
            </div>
        </div>
    );
}
