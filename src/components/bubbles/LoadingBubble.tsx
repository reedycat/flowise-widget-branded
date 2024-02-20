import { TypingBubble } from '@/components';

type LProps = {
  typingBubbleColor?: string;
};

export const LoadingBubble = (props: LProps) => (
  <div class="flex justify-start mb-2 items-start animate-fade-in host-container">
    <span
      class="px-4 py-4 ml-2 whitespace-pre-wrap max-w-full chatbot-host-bubble"
      style={{ 'background-color': 'transparent' }}
      data-testid="host-bubble"
    >
      <TypingBubble typingBubbleColor={props.typingBubbleColor} />
    </span>
  </div>
);
