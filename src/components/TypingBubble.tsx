type TProps = {
  typingBubbleColor?: string;
};

export const TypingBubble = (props: TProps) => {
  const bubleStyle = props.typingBubbleColor
    ? {
        'background-color': props.typingBubbleColor,
      }
    : '';

  return (
    <div class="flex items-center">
      <div class="w-2 h-2 mr-1 rounded-full bubble1" style={bubleStyle} />
      <div class="w-2 h-2 mr-1 rounded-full bubble2" style={bubleStyle} />
      <div class="w-2 h-2 rounded-full bubble3" style={bubleStyle} />
    </div>
  );
};
