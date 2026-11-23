/** Custom cursor markup. <MotionProvider> drives it on mouse/trackpad devices when motion is allowed. */
export function Cursor() {
  return (
    <div id="cur" aria-hidden="true">
      <div className="cur-x">
        <div className="cur-in"><i className="h" /><i className="v" /><i className="b" /></div>
      </div>
      <div className="cur-tag mono" />
    </div>
  );
}
