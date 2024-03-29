import { createSignal, Show, splitProps } from 'solid-js';
import styles from '../../../assets/index.css';
import { BubbleButton } from './BubbleButton';
import { BubbleParams } from '../types';
import { Bot, BotProps } from '../../../components/Bot';

const defaultButtonColor = '#3B81F6';
const defaultIconColor = 'white';

export type BubbleProps = BotProps & BubbleParams;

export const Bubble = (props: BubbleProps) => {
  const [bubbleProps] = splitProps(props, ['theme']);

  const [isBotOpened, setIsBotOpened] = createSignal(false);
  const [isBotStarted, setIsBotStarted] = createSignal(false);
  const initialFloatingMsgState = !localStorage.getItem('hideBotFloatingMsg') ? true : false;
  const [isFloatMsgOpened, setFloatMsgOpened] = createSignal(initialFloatingMsgState);

  const openBot = () => {
    if (!isBotStarted()) setIsBotStarted(true);
    setIsBotOpened(true);
  };

  const closeBot = () => {
    setIsBotOpened(false);
  };

  const toggleBot = () => {
    isBotOpened() ? closeBot() : openBot();
  };

  const closeFloatingMsg = () => {
    setFloatMsgOpened(false);
    localStorage.setItem('hideBotFloatingMsg', '1');
  };

  return (
    <>
      <style>{styles}</style>
      {/* Floating welcome message */}
      {bubbleProps.theme?.chatWindow?.floatingWelcomeMessage && (
        <div
          class={
            `fixed w-72 leading-5 text-sm rounded-xl shadow-lg` +
            (props.theme?.button?.size === 'large' ? ' bottom-6' : ' bottom-6') +
            (props.theme?.button?.size === 'large' ? ' right-24' : ' right-20') +
            (isBotOpened() || !isFloatMsgOpened() ? ' opacity-0 pointer-events-none' : ' opacity-1')
          }
          style={{
            'background-color': bubbleProps.theme?.chatWindow?.botMessage?.backgroundColor,
            color: bubbleProps.theme?.chatWindow?.botMessage?.textColor,
            // border: '2px solid ' + bubbleProps.theme?.chatWindow?.backgroundColor,
            transition: 'transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out',
            'transform-origin': 'center right',
            transform: isBotOpened() || !isFloatMsgOpened() ? 'scale3d(0, 0, 1)' : 'scale3d(1, 1, 1)',
            'box-shadow': 'rgb(0 0 0 / 16%) 0px 5px 40px',
            'z-index': 42424242,
          }}
        >
          <div class="relative h-full w-full px-4 py-2.5">
            {bubbleProps.theme?.chatWindow.floatingWelcomeMessage}
            <button class="absolute top-0 right-1 p-1 text-2xl rotate-45 hover:-rotate-90" onClick={closeFloatingMsg}>
              +
            </button>
          </div>
        </div>
      )}
      <BubbleButton {...bubbleProps.theme?.button} toggleBot={toggleBot} isBotOpened={isBotOpened()} />
      <div
        part="bot"
        style={{
          height: bubbleProps.theme?.chatWindow?.height ? `${bubbleProps.theme?.chatWindow?.height.toString()}px` : 'calc(100% - 100px)',
          width: bubbleProps.theme?.chatWindow?.width ? `${bubbleProps.theme?.chatWindow?.width.toString()}px` : undefined,
          transition: 'transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out',
          'transform-origin': 'bottom right',
          transform: isBotOpened() ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
          'box-shadow': 'rgb(0 0 0 / 16%) 0px 5px 40px',
          'background-color': bubbleProps.theme?.chatWindow?.backgroundColor || '#ffffff',
          'z-index': 42424242,
        }}
        class={
          `fixed sm:right-5 rounded-lg w-full sm:w-[400px] max-h-[704px]` +
          (isBotOpened() ? ' opacity-1' : ' opacity-0 pointer-events-none') +
          (props.theme?.button?.size === 'large' ? ' bottom-28' : ' bottom-24')
        }
      >
        <Show when={isBotStarted()}>
          <Bot
            badgeBackgroundColor={bubbleProps.theme?.chatWindow?.backgroundColor}
            bubbleBackgroundColor={bubbleProps.theme?.button?.backgroundColor ?? defaultButtonColor}
            bubbleTextColor={bubbleProps.theme?.button?.iconColor ?? defaultIconColor}
            showTitle={bubbleProps.theme?.chatWindow?.showTitle}
            title={bubbleProps.theme?.chatWindow?.title}
            titleAvatarSrc={bubbleProps.theme?.chatWindow?.titleAvatarSrc}
            welcomeMessage={bubbleProps.theme?.chatWindow?.welcomeMessage}
            whiteLabel={bubbleProps.theme?.chatWindow?.whiteLabel}
            poweredByText={bubbleProps.theme?.chatWindow?.poweredByText}
            poweredByUrl={bubbleProps.theme?.chatWindow?.poweredByUrl}
            poweredByTextColor={bubbleProps.theme?.chatWindow?.poweredByTextColor}
            textInput={bubbleProps.theme?.chatWindow?.textInput}
            botMessage={bubbleProps.theme?.chatWindow?.botMessage}
            userMessage={bubbleProps.theme?.chatWindow?.userMessage}
            fontSize={bubbleProps.theme?.chatWindow?.fontSize}
            chatflowid={props.chatflowid}
            chatflowConfig={props.chatflowConfig}
            apiHost={props.apiHost}
            observersConfig={props.observersConfig}
          />
        </Show>
      </div>
    </>
  );
};
