type TProps = {
  typingBubbleColor?: string;
};

export const TypingBubble = (props: TProps) => {
  return (
    <div class="flex items-center">
      <div class="w-2 h-2 mr-1 rounded-full bubble1" style={props.typingBubbleColor ? { 'background-color': props.typingBubbleColor } : ''} />
      <div class="w-2 h-2 mr-1 rounded-full bubble2" style={props.typingBubbleColor ? { 'background-color': props.typingBubbleColor } : ''} />
      <div class="w-2 h-2 rounded-full bubble3" style={props.typingBubbleColor ? { 'background-color': props.typingBubbleColor } : ''} />
    </div>
  );
};
