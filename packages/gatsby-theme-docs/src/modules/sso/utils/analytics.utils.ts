// utility to track GA events client-side in a robust ways
// lives in the SSO theme because typescript support is helpful in this case and the event tracking use cases are
// (until the packages are merged anyways) all learning and authentication related
// Recommended events reference: https://developers.google.com/tag-platform/gtagjs/reference/events

export const gtagEvent = (
  eventName: EventNames | CustomEventNames,
  eventParams?: ControlParams | EventParams | CustomParams
) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function')
    window.gtag('event', eventName, eventParams);
};

// typescript's "Parameters" utility can't extract overloaded functions so here's copypasta of some of the signatures in @types/gtag.js
// https://github.com/microsoft/TypeScript/issues/32164
// Ecommerce pricing related types commnted out for ease of use as they are not applicable.
interface ControlParams {
  groups?: string | string[] | undefined;
  send_to?: string | string[] | undefined;
  event_callback?: (() => void) | undefined;
  event_timeout?: number | undefined;
}
interface CustomParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// "our" events. Please add as needed
type CustomEventNames =
  | 'submit_quiz'
  | 'update_userinfo'
  | 'logout'
  | 'ai_assistant_launch'
  | 'search_tag_click'
  | 'page_feedback';

type EventNames =
  // | 'add_payment_info'
  // | 'add_shipping_info'
  // | 'add_to_cart'
  | 'add_to_wishlist'
  // | 'begin_checkout'
  // | 'checkout_progress'
  | 'earn_virtual_currency'
  | 'exception'
  | 'generate_lead'
  | 'join_group'
  | 'level_end'
  | 'level_start'
  | 'level_up'
  | 'login'
  | 'page_view'
  | 'post_score'
  | 'purchase'
  // | 'refund'
  // | 'remove_from_cart'
  | 'screen_view'
  | 'search'
  | 'select_content'
  | 'select_item'
  // | 'select_promotion'
  // | 'set_checkout_option'
  | 'share'
  | 'sign_up'
  | 'spend_virtual_currency'
  | 'tutorial_begin'
  | 'tutorial_complete'
  | 'unlock_achievement'
  | 'timing_complete'
  // | 'view_cart'
  | 'view_item'
  | 'view_item_list'
  // | 'view_promotion'
  | 'view_search_results';

interface EventParams {
  // checkout_option?: string | undefined;
  // checkout_step?: number | undefined;
  content_id?: string | undefined;
  content_type?: string | undefined;
  coupon?: string | undefined;
  // currency?: string | undefined;
  description?: string | undefined;
  fatal?: boolean | undefined;
  // items?: Item[] | undefined;
  method?: string | undefined;
  number?: string | undefined;
  // promotions?: Promotion[] | undefined;
  screen_name?: string | undefined;
  search_term?: string | undefined;
  // shipping?: Currency | undefined;
  // tax?: Currency | undefined;
  transaction_id?: string | undefined;
  value?: number | undefined;
  event_label?: string | undefined;
  event_category?: string | undefined;
  feedback_page?: string | undefined;
  feedback_value?: string | undefined; // 1 = thumbs up, -1 = thumbs down
}
