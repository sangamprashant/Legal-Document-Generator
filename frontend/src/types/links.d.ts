interface SubLink {
  title: string;
  link: string;
}

interface MainLink {
  title: string;
  link?: string;
  icon: JSX.Element;
  subLinks?: SubLink[];
}
