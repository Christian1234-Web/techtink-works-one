import React from "react";
import { motion, usePresence, AnimatePresence } from "framer-motion";
import PortfolioCard from "~components/lib/Card/PortfolioCard";
import portfolioDataDefault from "./data";
import { Container } from "react-bootstrap";

const FilterButton = ({ name, handleSetTag, tagActive, children }) => {
  return (
    <button
      className={`btn ${tagActive === name ? "active" : ""}`}
      onClick={() => handleSetTag(name)}
    >
      {children}
    </button>
  );
};

const PortfolioSection = ({
  gridCol = "col-xs-6",
  sectionClass = "portfoliogrid-section-01",
  portfolioData = portfolioDataDefault,
  itemToShow,
  fluid = false,
  noGutter,
}) => {
  const [tag, setTag] = React.useState("all");
  const [filteredImages, setFilteredImages] = React.useState([]);

  React.useEffect(() => {
    tag === "all"
      ? setFilteredImages(portfolioData)
      : setFilteredImages(
          portfolioData.filter((image) =>
            image.tags.find((item) => item === tag)
          )
        );
  }, [tag]);
  return (
    <div className={sectionClass}>
      <Container flud={fluid}>
        <div className="row">
          <div
            id="portfoliogridMenu"
            className="portfoliogrid--tab portfolio-filter-menu"
          >
            <FilterButton
              className="is-checked"
              name="all"
              tagActive={tag}
              handleSetTag={setTag}
            >
              All
            </FilterButton>
            <FilterButton name="work" tagActive={tag} handleSetTag={setTag}>
              Design
            </FilterButton>
            <FilterButton
              name="development"
              tagActive={tag}
              handleSetTag={setTag}
            >
              Development
            </FilterButton>
            <FilterButton
              name="marketing"
              tagActive={tag}
              handleSetTag={setTag}
            >
              Marketing
            </FilterButton>
            <FilterButton name="seo" tagActive={tag} handleSetTag={setTag}>
              SEO
            </FilterButton>
          </div>
        </div>
        <div className={`row portfolio-active${noGutter ? " g-0" : ""}`}>
          <AnimatePresence>
            {filteredImages
              .slice(0, itemToShow)
              .map(({ image, title, tags, tag, id }, index) => {
                return (
                  <ItemCol
                    className={`${gridCol} z-index portfolio-1 portfolio-2 ${
                      tags.find((item) => item === tag) | (tag === "all")
                        ? "is-animated"
                        : ""
                    } `}
                    key={index + "pm-c4"}
                  >
                    <PortfolioCard image={image} title={title} tag={tag} />
                  </ItemCol>
                );
              })}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  );
};

export default PortfolioSection;

const transition = { type: "spring", stiffness: 500, damping: 50, mass: 1 };

function ItemCol({ children, onClick, color, ...rest }) {
  const [isPresent, safeToRemove] = usePresence();

  const animations = {
    layout: true,
    initial: "out",
    style: {
      position: isPresent ? "static" : "absolute",
    },
    animate: isPresent ? "in" : "out",
    whileTap: "tapped",
    variants: {
      in: { scale: 1, opacity: 1 },
      out: { scale: 0, opacity: 0, zIndex: -1 },
      // tapped: { scale: 0.98, opacity: 0.5, transition: { duration: 0.1 } }
    },
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition,
  };

  return (
    <motion.div {...animations} {...rest}>
      {children}
    </motion.div>
  );
}
