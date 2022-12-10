export interface BSportApiResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

export interface Booking {
  attendance?: boolean;
  attendance_date_updated?: string;
  booking_status_code?: 0 | 1 | 2 | 3;
  coach: number;
  coach_override: number;
  consumer: number;
  consumer_payment_pack?: number;
  credit_consumed?: number;
  custom_level: number;
  date?: string;
  date_canceled?: string;
  establishment: number;
  first_in_company?: boolean;
  id?: number;
  is_deleted?: boolean;
  is_discardable: boolean;
  level: number;
  member: number;
  meta_activity: number;
  name?: string;
  offer: number;
  offer_date_start: string;
  offer_duration_minute: number;
  recurrence_rule_booking?: number;
  source?: 0 | 1 | 2 | 3 | 4;
  source_member?: number;
  spot_id: number;
  spot_information?: any;
  staff_history?: any;
  was_refunded?: boolean;
}

export interface Coach {
  associatedcoach_set: number[];
  coach_friends?: number[];
  description?: string;
  facebook_url?: string;
  id?: number;
  instagram_url?: string;
  medianRating?: string;
  user?: {
    name?: string;
    first_name?: string;
    last_name?: string;
    gender?: string;
    birthday?: string | null;
    photo?: string;
  };
}

export interface Establishment {
  associatedestablishment_set?: number[];
  capacity?: number;
  cover?: string;
  disabled?: boolean;
  easy_access?: {
    id?: number;
    lines?: string;
    name?: string;
  };
  establishment_billing_group_id?: string;
  has_next_slots?: boolean;
  id?: number;
  location: {
    address?: string;
    address_line_1?: string;
    address_line_2?: string;
    city?: string;
    country?: string;
    country_code?: string;
    geocoded_data?: any;
    geometry: string;
    latitude?: number;
    longitude?: number;
    state?: string;
    zipcode?: string;
  };
  practical_info?: string;
  related_company?: number;
  specific_info?: string;
  title: string;
  tzname?: string;
}

export interface Member {
  accept_email?: boolean;
  archived?: boolean;
  consumer: number;
  credit_account_balance?: number;
  date_joined?: string;
  email?: string;
  id: number;
  name: string;
  phone?: string;
  photo?: string;
  tags: number[];
  total_unpaid_amount?: number;
  vaccination_status: string;
}

export interface MetaActivity {
  activities?: number[];
  alt_cover_main?: string;
  auto_discard_hours_before_start?: number;
  auto_discard_min_bookings_nb?: number;
  category?: number;
  color?: string;
  company?: number;
  cover_main?: string;
  custom_restriction_rule: any[];
  customer_enabled?: boolean;
  description?: string;
  establishments?: { id: number }[];
  first_booking_minutes_until?: number;
  id?: number;
  images?: { id?: number; image?: string }[];
  is_broadcast?: boolean;
  is_workshop?: boolean;
  last_booking_minutes?: number;
  last_discard_minutes?: number;
  name: string;
  next_slot?: string;
  ordering_in_category?: number;
  parent_category?: number;
  rating?: string;
  SCT: number;
}

export interface Offer {
  activity: number;
  allow_guest_offer?: boolean;
  available?: boolean;
  available_on_partnership?: boolean;
  bookings?: number[];
  booking_options?: number[];
  coach?: number;
  coach_override?: number;
  coach_payment_rule_id?: string;
  company?: number;
  credit_price_override?: number;
  credit_price?: number;
  custom_level: number;
  date_start: string;
  duration_minute?: number;
  effectif?: number;
  establishment?: number;
  establishment_override?: number;
  full?: boolean;
  group: number;
  id?: number;
  is_waiting_list_full?: boolean;
  level?: number;
  manager_only?: boolean;
  meta_activity?: number;
  meta_activity_color?: string;
  partner_max_booking_count?: number;
  recurrence_id?: number;
  room_blueprint?: number;
  timezone_name?: string;
  tot_slots?: number;
  validated_booking_count?: number;
  waiting_list_disabled?: boolean;
  waiting_list_max_size?: number;
  whitelist_tags?: number[];
}

export interface FullOffer
  extends Omit<
    Offer,
    | "establishment"
    | "establishment_override"
    | "meta_activity"
  > {
  establishment?: Establishment;
  meta_activity?: MetaActivity;
}

export interface BookingWithFullMember extends Omit<Booking, "member"> {
  member?: Member;
}
