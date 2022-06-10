import './Timeline.css';

function Timeline() {
  return (
    <section className='timeline'>
        <div className='timeline__part'>
          <p className='timeline__line timeline__line_color_green'>1 неделя</p>
          <p className='timeline__text'>Back-end</p>
        </div>
        <div className='timeline__part'>
          <p className='timeline__line'>4 недели</p>
          <p className='timeline__text'>Front-end</p>
          </div>
      </section>
  );
}

export default Timeline;