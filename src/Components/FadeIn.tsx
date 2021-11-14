import React, {
    JSXElementConstructor,
    PropsWithChildren,
    useEffect,
    useState,
} from "react";

interface Props {
    delay?: number;
    display?: string;
    transitionDuration?: number;
    wrapperTag?: JSXElementConstructor<any>;
    childTag?: JSXElementConstructor<any>;
    className?: string;
    childClassName?: string;
    visible?: boolean;
    onComplete?: () => any;
}

export default function FadeIn(props: PropsWithChildren<Props>) {
    const [maxIsVisible, setMaxIsVisible] = useState(0);
    const transitionDuration = props.transitionDuration || 400;
    const display = props.display || "block";
    const delay = props.delay || 50;
    const WrapperTag = props.wrapperTag || "div";
    const ChildTag = props.childTag || "div";
    const visible = typeof props.visible === "undefined" ? true : props.visible;

    useEffect(() => {
        let count = React.Children.count(props.children);
        if (!visible) {
            count = 0;
        }

        if (count === maxIsVisible) {
            const timeout = setTimeout(() => {
                if (props.onComplete) props.onComplete();
            }, transitionDuration);
            return () => clearTimeout(timeout);
        }

        const increment = count > maxIsVisible ? 1 : -1;
        const timeout = setTimeout(() => {
            setMaxIsVisible(maxIsVisible + increment);
        }, delay);
        return () => clearTimeout(timeout);
    }, [
        // eslint-disable-next-line react-hooks/exhaustive-deps
        React.Children.count(props.children),
        delay,
        maxIsVisible,
        visible,
        transitionDuration,
    ]);

    return (
        <WrapperTag className={props.className}>
            {React.Children.map(props.children, (child, i) => {
                return (
                    <ChildTag
                        className={props.childClassName}
                        style={{
                            display: `${display}`,
                            transition: `opacity ${transitionDuration}ms, transform ${transitionDuration}ms`,
                            transform: maxIsVisible > i ? "none" : "translateY(20px)",
                            opacity: maxIsVisible > i ? 1 : 0,
                        }}
                    >
                        {child}
                    </ChildTag>
                );
            })}
        </WrapperTag>
    );
}