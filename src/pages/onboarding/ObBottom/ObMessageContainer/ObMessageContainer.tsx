import './ObMessageContainer.scss';

export interface IObMessageContainerProps {
  currentIndex: number;
  pageCount: number;
}

const contentMap: { [key: number]: { title: string; message: string } } = {
  1: {
    title: 'Your Financial Health Score',
    message:
      'Get a clear, easy-to-understand score that tracks your financial wellness and guides your next steps.',
  },
  2: {
    title: 'Set Goals, Stay on Track',
    message:
      'Define personal milestones, and we’ll create a roadmap to keep you aligned with your financial goals.',
  },
  3: {
    title: 'All Your Finances in One View',
    message:
      'See a consolidated view of your assets, liabilities, and spending habits for easy tracking and planning.',
  },
  4: {
    title: 'Easy, Accessible Guidance',
    message:
      'Navigate financial advice with voice support, making your experience simple and intuitive.',
  },
};

function ObMessageContainer({
  pageCount = 4,
  currentIndex,
}: IObMessageContainerProps) {
  console.log('currentIndex', pageCount);
  const content = contentMap[currentIndex]; // Access the object with key 1
  return (
    <div className="obMessageContainer">
      <h1 className="title">{content.title}</h1>
      <p className="message">{content.message}</p>
    </div>
  );
}

export default ObMessageContainer;
