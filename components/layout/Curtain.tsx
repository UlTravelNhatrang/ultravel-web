/* eslint-disable @next/next/no-img-element -- logo PNG renders at its exact intrinsic ratio */

/**
 * Page-change curtain: an orange edge and a navy panel wipe up over the page, say where you're going
 * (big title, a local tip, a progress line), then lift away once the new page is in. The curved edges are
 * fixed "caps" on each panel, so the animation moves only transforms. Rendered on the server so the
 * first-visit loader (html.boot, set by the motion-flag script) covers the very first paint.
 * Driven by <CurtainController>; text in [data-curtain-*] is filled in per navigation.
 */
export function Curtain() {
  return (
    <div id="curtain" className="curtain" aria-hidden="true">
      <div className="curtain-a"><i className="cap cap-top" /><i className="cap cap-bottom" /></div>
      <div className="curtain-b">
        <i className="cap cap-top" /><i className="cap cap-bottom" />
        <span className="curtain-grid" />
        <img src="/assets/ultravel-wordmark-light.png" alt="" width={981} height={160} className="curtain-logo" />
        <div className="curtain-in">
          <p className="curtain-kicker mono"><i className="curtain-dot" /><span data-curtain-kicker>Xin chào</span></p>
          <p className="curtain-title" data-curtain-title><span className="w"><span>Nha</span></span> <span className="w"><span>Trang</span></span></p>
          <svg className="curtain-wave" viewBox="0 0 200 16" preserveAspectRatio="none">
            <path d="M3 9 C28 2 48 2 70 9 S112 16 134 9 S176 2 197 8" pathLength={1} />
          </svg>
          <p className="curtain-tip"><span className="mono">Mẹo thổ địa</span><span data-curtain-tip>Biển Trần Phú đẹp nhất lúc 5 giờ 30 sáng.</span></p>
        </div>
        <span className="curtain-bar"><i /></span>
        <p className="curtain-count num" data-curtain-count>00</p>
        <p className="curtain-coord mono">12°15&apos;N 109°11&apos;E · Nha Trang</p>
      </div>
    </div>
  );
}
