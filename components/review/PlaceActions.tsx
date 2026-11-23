'use client';

import { useEffect, useState } from 'react';
import { Heart, ShareNetwork, PencilSimpleLine } from '@phosphor-icons/react';
import { copyText } from '@/lib/clipboard';

const savedKey = (slug: string) => `ultravel:saved:${slug}`;

/** Save (kept in this browser), share (native sheet or copy link) and write a review. */
export function PlaceActions({ slug, name }: { slug: string; name: string }) {
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    try { setSaved(localStorage.getItem(savedKey(slug)) === '1'); } catch {} // eslint-disable-line react-hooks/set-state-in-effect -- read browser storage once after mount
  }, [slug]);

  const toggleSave = () => {
    const next = !saved;
    setSaved(next);
    try { if (next) localStorage.setItem(savedKey(slug), '1'); else localStorage.removeItem(savedKey(slug)); } catch {}
  };

  const share = async () => {
    const url = location.href;
    if (navigator.share) {
      try { await navigator.share({ title: `${name} | Ultravel`, url }); return; } catch { /* closed the sheet */ return; }
    }
    if (await copyText(url)) { setShared(true); setTimeout(() => setShared(false), 2000); }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button type="button" onClick={toggleSave} aria-pressed={saved} className={`act-btn ${saved ? 'is-on' : ''}`}>
        <Heart size={16} weight={saved ? 'fill' : 'regular'} aria-hidden="true" />{saved ? 'Đã lưu' : 'Lưu'}
      </button>
      <button type="button" onClick={share} className="act-btn">
        <ShareNetwork size={16} aria-hidden="true" />{shared ? 'Đã chép liên kết' : 'Chia sẻ'}
      </button>
      <button type="button" data-open-review className="act-btn act-btn-hot">
        <PencilSimpleLine size={16} aria-hidden="true" />Viết đánh giá
      </button>
    </div>
  );
}
