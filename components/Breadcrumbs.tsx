import Head from "next/head";
import Link from 'next/link';

interface BreadcrumbsProps {
    breadcrumbs: BreadcrumbItem[];
}
interface BreadcrumbItem {
    href?: string;
    title: string;
}
export default function Breadcrumbs({breadcrumbs}: BreadcrumbsProps) {
    return (
        <ol className="breadcrumbs mb-14" itemScope itemType="https://schema.org/BreadcrumbList">
            {
                breadcrumbs.map((item, i) => (
                    <li className="breadcrumbs__item" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                        { item.href ? 
                            <Link href={item.href}><a className="underline" itemProp="item"><span itemProp="name">{item.title}</span></a></Link> : 
                            <span itemProp="name">{item.title}</span> 
                        } 
                        <meta itemProp="position" content={`${i + 1}`} />
                    </li>
                ))
            }
        </ol>
    )
}