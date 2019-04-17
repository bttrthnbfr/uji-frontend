import React from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { push } from "connected-react-router"
import qs from 'querystring'

import Button from "../../components/Button"
import BreadCrumbC from "../../components/BreadCrumb"
import TitleC from "../../components/Title"
import FilterC from "../../components/Filter"
import ExamGroupCardC from "../../components/ExamGroupCard"
import PaginationC from "../../components/Pagination"

import actions from "../../redux/actions" 

class Home extends React.Component{

  state = {
    limitItems: 2,
    totalPage: 10,
    page: 1
  }

  componentDidMount = async() => {
    this.getPage()    
    this.fetchExamGroups()
  }
  
  componentWillReceiveProps = (nextProps) => {
    this.getTotalPage(nextProps.examGroups.payload.count)
  }

  //pagination
  getPage = () => {
    const params = qs.parse(this.props.location.search.replace("?",""))
    this.setState({
      page: parseInt(params.page || 1)
    })
  }

  getTotalPage = (count) => {
    this.setState({
      totalPage: Math.ceil(count / this.state.limitItems)
    })
  }

  onClickPage = (v) => {
    this.props.dispatch(push(`/?page=${v}`))

    //set state Page
    this.setState({
      page: v
    })
  }

  //end pagination

  fetchExamGroups = () => {
    this.props.dispatch(actions.fetchExamGroupsData())
  }

  render(){
    return (
      <Wrapper>
        {/* {console.log(this.state)} */}
        <Banner>
          <BannerContentWrap>
            <BannerTitle>Selamat Datang di Uji Yuksinau</BannerTitle>
            <BannerDesc>Uji yuksinau adalah sebuah website ujian online,  pada website ini terdapat banyak course/tryout gratis mulai dari ujian nasional sampai smbpn</BannerDesc>
            <Button title="Signup now" onClick={() => console.log("hello boy")} width={130}/>
          </BannerContentWrap>
        </Banner>
        <MainWrap>
          <BreadCrumb
            links={[
              {
                title:"exam-groups",
                link:"#"
              }
            ]}
          />
          <Title title="Exam Groups"/>
          <FiltersWrap>
            <Filter
              title="Level"
              options={[]}
            />
            <Filter
              title="Class"
              options={[]}
            />
            <Filter
              title="Tag"
              options={[]}
            />
          </FiltersWrap>
          <ExamGroupCardWrap>
            {this.props.examGroups.payload.data.map((v) => (
              <ExamGroupCard
                title={v.title}
                tag={["UN"]}
                description={v.description}
                level={v.level.title}
                class={v.class.title}
                onClick={() => this.props.dispatch(push(`/exam-groups/${v.slug}`))}
              />
            ))}
          </ExamGroupCardWrap>
          <Pagination
            activePage={this.state.page}
            // totalPage={this.state.totalPage}
            totalPage={20}
            onClickPage={this.onClickPage}
          />
        </MainWrap>
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ examGroups }) => {
  return {
    examGroups
  }
}

export default connect(mapStateToProps)(Home)


const Wrapper = styled.section`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  min-height: 1000px;
`
const Banner = styled.section`
  @media (min-width: 0px) and (max-width: 480px) {
    padding-left: 20px;
    padding-right: 20px;
  }

  width: 100%;
  height: 500px;
  background-color: #24304e;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`

const BannerTitle = styled.h1`
  font-weight: 600;
  font-size: 44px;
  line-height: 55px;
  margin: 0px;
  color: white;
  max-width: 435px;
  margin-bottom: 10px;
`

const BannerDesc = styled.p`  
  max-width: 570px;
  color: white;
  margin: 0px;
  line-height: 25px;
  margin-bottom: 30px;
`

const BannerContentWrap = styled.section`
  width: 960px;
  padding-bottom: 50px;
`
const MainWrap = styled.section`
  @media (min-width: 0px) and (max-width: 480px) {
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }

  width: 960px;
  align-self: center;
  display: flex; 
  flex-direction: column;
`
const BreadCrumb = styled(BreadCrumbC)`
  margin-top: 20px;
  margin-bottom: 10px;
`
const Title = styled(TitleC)`
  margin-bottom: 30px;
`
const Filter = styled(FilterC)`
  margin-right: 10px;
`

const FiltersWrap = styled.section`
  display: flex;
  margin-bottom: 50px;
  overflow: auto;
`
const ExamGroupCard = styled(ExamGroupCardC)`
  margin-bottom: 15px;
`
const ExamGroupCardWrap = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 50px;
`

const Pagination = styled(PaginationC)`
  align-self: center;
  margin-bottom: 100px;
`