import * as React from "react";
import { SVGProps, memo } from "react";

interface SvgComponentProps extends SVGProps<SVGSVGElement> {
    color?: string; // Static color prop
    hoverColor?: string; // Hover color prop
    className?: string; // Additional prop for custom class names
}

const SvgComponent = ({ color = "#3C3C3C", hoverColor, className, ...props }: SvgComponentProps) => (
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     width={19}
    //     height={19}
    //     fill="none"
    //     className={className} // Apply the custom class name
    //     {...props}
    //   >
    //     <path
    //       fill={color} // Set the static fill color
    //       className={`fill-current ${hoverColor ? 'hover-fill' : ''}`} // Apply the hover-fill class conditionally
    //       d="m5.614 16.452.363-.712-.363.712Zm-.692-.692.713-.363-.713.364Zm9.155 0-.713-.363.713.364Zm-.692.692-.363-.712.363.712ZM3.958 4.742a.8.8 0 1 0 0 1.6v-1.6Zm11.083 1.6a.8.8 0 1 0 0-1.6v1.6Zm-1.591-.8v8.55h1.6v-8.55h-1.6Zm-1.734 10.283H7.283v1.6h4.433v-1.6ZM3.95 5.542v8.55h1.6v-8.55h-1.6Zm3.333 10.283c-.457 0-.75 0-.975-.019-.214-.017-.293-.047-.33-.066l-.727 1.425c.3.154.613.21.927.236.304.025.675.024 1.105.024v-1.6ZM3.95 14.092c0 .43-.001.8.024 1.105.026.313.082.626.235.927l1.426-.727c-.02-.037-.049-.116-.066-.33a13.459 13.459 0 0 1-.02-.975h-1.6Zm2.027 1.648a.783.783 0 0 1-.342-.343l-1.426.727c.229.448.594.813 1.042 1.041l.726-1.425Zm7.473-1.648c0 .456 0 .75-.02.974-.017.215-.046.293-.066.331l1.426.727c.153-.301.21-.614.235-.927.025-.304.025-.675.025-1.105h-1.6Zm-1.734 3.333c.43 0 .801 0 1.105-.024.314-.026.626-.082.927-.236l-.726-1.425c-.038.019-.116.049-.33.066-.225.018-.52.019-.976.019v1.6Zm1.648-2.028a.783.783 0 0 1-.342.343l.726 1.425a2.384 2.384 0 0 0 1.042-1.041l-1.426-.727ZM3.958 6.342h.792v-1.6h-.792v1.6Zm.792 0h9.5v-1.6h-9.5v1.6Zm9.5 0h.791v-1.6h-.791v1.6ZM7.529 4.908c0-.891.813-1.733 1.97-1.733v-1.6c-1.902 0-3.57 1.426-3.57 3.333h1.6Zm1.97-1.733c1.158 0 1.971.842 1.971 1.733h1.6c0-1.907-1.667-3.333-3.57-3.333v1.6ZM5.93 4.908v.634h1.6v-.634h-1.6Zm5.541 0v.634h1.6v-.634h-1.6Z"
    //     />
    //   </svg>
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        className={className}>
        <path
            className={`fill-current ${hoverColor ? 'hover-fill' : ''}`}
            d="M13.7457 3.51001L15.5057 7.03001C15.7457 7.52002 16.3857 7.99001 16.9257 8.08001L20.1157 8.61001C22.1557 8.95001 22.6357 10.43 21.1657 11.89L18.6857 14.37C18.2657 14.79 18.0357 15.6 18.1657 16.18L18.8757 19.25C19.4357 21.68 18.1457 22.62 15.9957 21.35L13.0057 19.58C12.4657 19.26 11.5757 19.26 11.0257 19.58L8.03566 21.35C5.89566 22.62 4.59566 21.67 5.15566 19.25L5.86566 16.18C5.99566 15.6 5.76566 14.79 5.34566 14.37L2.86566 11.89C1.40566 10.43 1.87566 8.95001 3.91566 8.61001L7.10566 8.08001C7.63566 7.99001 8.27566 7.52002 8.51566 7.03001L10.2757 3.51001C11.2357 1.60001 12.7957 1.60001 13.7457 3.51001Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

);

const Memo = memo(SvgComponent);
export default Memo;