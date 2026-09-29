/** A TV showing one family message, like the real screen (uses the .tvbig styles). */
export function TvMock({ msg, from, time = 'Sunday 4:15' }: { msg: string; from: string; time?: string }) {
  return (
    <div className="tvbig" aria-hidden="true">
      <div className="tvbig-screen">
        <span className="tv-clock">{time}</span>
        <span className="tv-new">New</span>
        <p className="tv-msg">“{msg}”</p>
        <span className="tv-from">{from}</span>
      </div>
    </div>
  );
}
