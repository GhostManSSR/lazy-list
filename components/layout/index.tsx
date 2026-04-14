import {Layout as LayoutProps} from "../../types/layout/types"
import Header from "@/components/layout/Header";
import React from "react";
import Footer from "@/components/layout/Footer";
import styles from '../../asserts/components/layout/index.module.less'
import {Head} from "next/document";

const Layout: React.FC<LayoutProps> = (props) => {

    return(
        <>
            <main className={styles.layout}>
                <Header />
                <section className={styles.layout__section}>
                    {props.children}
                </section>
                <Footer />
            </main>
            </>
    )
}

export default Layout;