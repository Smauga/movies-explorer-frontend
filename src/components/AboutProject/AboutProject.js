import './AboutProject.css';
import Timeline from "../Timeline/Timeline";

function AboutProject() {
  return (
    <section className='about-project' id='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__columns'>
        <div className='about-project__column'>
          <h3 className='about-project__column-title'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__column-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about-project__column'>
          <h3 className='about-project__column-title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__column-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <Timeline />
    </section>
  );
}

export default AboutProject;