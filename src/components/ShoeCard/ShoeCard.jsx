import React from 'react';
import styled from 'styled-components';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'
  const priceColor = variant === 'on-sale' ? COLORS.gray[500] : 'inherit';
  const pricedeco = variant === 'on-sale' ? 'line-through' : 'undefined';
  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant === 'on-sale' && <SaleTag>Sale</SaleTag>}
          {variant === 'new-release' && <ReleaseTag>Just Released!</ReleaseTag>}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              '--priceColor': priceColor,
              '--pricedeco': pricedeco,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice && <SalePrice>{formatPrice(salePrice)}</SalePrice>}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  margin: 16px;
`;

const ImageWrapper = styled.div`
  position: relative;
  max-width: 340px;
`;

const Tag = styled.div`
  position: absolute;
  top: 12px;
  right: -6px;
  color: white;
  font-weight: 700;
  padding: ${8 / 16}em;
  font-size: 14px;
  border-radius: 2px;
`;

const SaleTag = styled(Tag)`
  background: ${COLORS.primary};
`;

const ReleaseTag = styled(Tag)`
  background: ${COLORS.secondary};
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--priceColor);
  text-decoration: var(--pricedeco);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
