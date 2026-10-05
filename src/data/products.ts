import type { Product } from '../types';
import vaporessoXros6 from '../assets/products/vl/vaporesso-xros-6.png';
import smoantPasitoIii from '../assets/products/vl/smoant-pasito-iii.png';
import elfbarSourKing from '../assets/products/vl/elfbar-sour-king.png';
import lostMaryViper from '../assets/products/vl/lost-mary-viper.png';
import rickMortyAppleGrape from '../assets/products/vl/rick-morty-apple-grape.png';
import rickMortyRaspberryJam from '../assets/products/vl/rick-morty-raspberry-jam.png';

export const products: Product[] = [
  { id: 'vaporesso-xros-6', title: 'VAPORESSO XROS 6', category: 'pod', price: 3000, availability: 'in_stock', image: vaporessoXros6, manufacturer: 'VAPORESSO', description: 'Стильная POD-система с экраном, регулировкой обдува и технологией COREX.', characteristics: { 'Аккумулятор': '1800 мА·ч', 'Объём картриджа': '3 мл', 'Мощность': 'До 30 Вт', 'Обдув': 'Регулируемый', 'Технология': 'COREX', 'Совместимые картриджи': '0.4 Ω / 0.6 Ω' } },
  { id: 'smoant-pasito-iii-kit', title: 'Smoant Pasito III Kit', category: 'pod', price: 3600, availability: 'in_stock', image: smoantPasitoIii, manufacturer: 'SMOANT', description: 'Компактный, стильный и мощный девайс для ежедневного использования.', characteristics: { 'Размер': 'Компактный', 'Автономность': 'Долгая', 'Испарители': 'K-Series Coils', 'Управление': 'Простое' } },
  { id: 'elfbar-sour-king-sour-berries', title: 'ELFBAR Sour King — Кислые ягоды', category: 'disposable', price: 1800, availability: 'in_stock', image: elfbarSourKing, manufacturer: 'ELFBAR', characteristics: { 'Количество затяжек': 'До 30 000', 'Устройство': 'Перезаряжаемое', 'Кислинка': '4 уровня', 'Крепость': '20 мг/мл' } },
  { id: 'lost-mary-viper-ice-watermelon', title: 'Funky Lands × Lost Mary Viper — Ледяной арбуз', category: 'disposable', price: 1900, availability: 'in_stock', image: lostMaryViper, manufacturer: 'LOST MARY', characteristics: { 'Количество затяжек': 'До 30 000', 'Мощность': 'До 28 Вт', 'Койл': 'Двойной сетчатый', 'Управление': 'Сенсорная кнопка' } },
  { id: 'rick-and-morty-bad-trip-apple-grape', title: 'Rick and Morty Bad Trip — Apple Grape', category: 'liquids', price: 600, availability: 'in_stock', image: rickMortyAppleGrape, manufacturer: 'Rick and Morty', description: 'Жидкость Extra Hard со вкусом яблока и винограда.', characteristics: { 'Вкус': 'Яблоко, виноград', 'Линейка': 'Bad Trip', 'Крепость': 'Extra Hard', 'Особенности': 'Насыщенный вкус, плотный пар' } },
  { id: 'rick-and-morty-russia-raspberry-jam', title: 'Rick and Morty Russia — Малиновое варенье', category: 'liquids', price: 600, availability: 'in_stock', image: rickMortyRaspberryJam, manufacturer: 'Rick and Morty', description: 'Жидкость Extra Hard со сладким вкусом настоящего малинового варенья.', characteristics: { 'Вкус': 'Малиновое варенье', 'Линейка': 'Russia', 'Крепость': '70 мг', 'Особенности': 'Насыщенный вкус, густой пар' } },
];
