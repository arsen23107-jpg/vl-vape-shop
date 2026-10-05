import { FormEvent, useMemo, useState } from 'react';
import { products } from '../data/products';
import { stores } from '../data/stores';
import Empty from '../components/Empty';
import { useCart } from '../hooks/useCart';

const money = (value: number) => new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
type Method = 'delivery' | 'pickup';

export default function Cart() {
  const { items, count, setQuantity, clear } = useCart();
  const [method, setMethod] = useState<Method>('delivery');
  const [payment, setPayment] = useState<'online' | 'store'>('online');
  const [complete, setComplete] = useState(false);
  const list = useMemo(() => products.flatMap(product => items[product.id] ? [{ product, quantity: items[product.id] }] : []), [items]);
  const total = list.reduce((sum, { product, quantity }) => sum + (product.price || 0) * quantity, 0);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setComplete(true); clear(); };

  if (complete) return <div className="container section"><Empty title="Заказ оформлен" text="Спасибо! Мы свяжемся с вами для подтверждения заказа." /></div>;
  if (!count) return <div className="container section"><Empty title="Корзина пока пуста" text="Добавьте товары из каталога — они появятся здесь." /></div>;

  return <div className="container section"><h1 className="h1">Корзина</h1><form className="checkout" onSubmit={submit}>
    <section className="checkout__products" aria-label="Товары в корзине">
      {list.map(({ product, quantity }) => <article className="cart-item" key={product.id}>
        <img src={product.image} alt={product.title} />
        <div><p className="muted">{product.manufacturer}</p><h2>{product.title}</h2><b>{money((product.price || 0) * quantity)}</b></div>
        <div className="quantity" aria-label={`Количество: ${quantity}`}><button type="button" aria-label="Уменьшить" onClick={() => setQuantity(product.id, quantity - 1)}>−</button><span>{quantity}</span><button type="button" aria-label="Увеличить" onClick={() => setQuantity(product.id, quantity + 1)}>+</button></div>
      </article>)}
    </section>
    <aside className="checkout__form">
      <p className="section-label">Оформление заказа</p>
      <div className="checkout__methods"><button type="button" className={method === 'delivery' ? 'is-on' : ''} onClick={() => { setMethod('delivery'); setPayment('online'); }}>Курьером</button><button type="button" className={method === 'pickup' ? 'is-on' : ''} onClick={() => setMethod('pickup')}>В магазине</button></div>
      <label>Имя<input className="field" name="firstName" required autoComplete="given-name" /></label>
      <label>Фамилия<input className="field" name="lastName" required autoComplete="family-name" /></label>
      <label>Номер телефона<input className="field" name="phone" required inputMode="tel" placeholder="+7 (___) ___-__-__" autoComplete="tel" /></label>
      {method === 'delivery' ? <label>Адрес доставки<input className="field" name="address" required autoComplete="street-address" placeholder="Улица, дом, квартира" /></label> : <label>Магазин<select className="field" name="store" required defaultValue=""><option value="" disabled>Выберите магазин</option>{stores.map(store => <option key={store.id} value={store.id}>{store.address}</option>)}</select></label>}
      {method === 'pickup' && <fieldset className="checkout__payment"><legend>Оплата</legend><label><input type="radio" name="payment" checked={payment === 'online'} onChange={() => setPayment('online')} /> Оплатить сейчас</label><label><input type="radio" name="payment" checked={payment === 'store'} onChange={() => setPayment('store')} /> Оплатить в магазине</label></fieldset>}
      {method === 'delivery' && <p className="checkout__note">При доставке доступна только оплата сейчас.</p>}
      <div className="checkout__total"><span>Итого, {count} шт.</span><b>{money(total)}</b></div>
      <button className="btn btn--accent checkout__submit" type="submit">{method === 'delivery' || payment === 'online' ? 'Оплатить' : 'Оформить заказ'}</button>
    </aside>
  </form></div>;
}
