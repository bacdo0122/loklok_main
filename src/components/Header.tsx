import { Avatar, Box, Divider, IconButton, InputAdornment, Menu, MenuItem, TextField, Tooltip } from '@mui/material';
import React, { useCallback, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { listPage } from '../const/listPage';
import '../css/Header.css';
import { removeAccessToken, removeRefreshToken } from '../helpers/localStorage';
import { setAuth, setUser } from '../reducers/auth';
import { useAppDispatch, useAppSelector } from '../stores/hook';
import { InputSearchWrap, ListNavBar, Navbar, useStyles } from '../styles/header';
import { debounce } from 'lodash';
const Header = ({ data }: any) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const user = useAppSelector((state: any) => state.auth.user);
  const [searchList, setSearchList] = useState([]);
  const [active, setActive] = useState(false);
  const [keyword, setKeyWord] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();

  const fetcheDropDownOptions = async (key: string) => {
    if (key === '') {
      setSearchList([]);
    } else {
      const res = await axios.get(process.env.REACT_APP_API_BASE_URL + `/films?page=1&limit=1000&search=${key}`);
      setSearchList(res.data.data);
    }
  };

  const debounceDropDown = useCallback(
    debounce((nextValue) => fetcheDropDownOptions(nextValue), 1000),
    [],
  );
  const handleSearchFilm = async (e: any) => {
    setKeyWord(e.target.value);
    debounceDropDown(e.target.value);
  };
  const handleDropDown = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Navbar className={`${classes.NavBarWrap} navbar`} data-navbar={data}>
      <ListNavBar className={classes.NavBarWrap}>
        <Link to="/">
          <Box component="img" src="https://static.netpop.app/img/loklok-white.png" className={classes.logo} />
        </Link>

        <ul className={`${classes.ul} nav-list`}>
          {listPage &&
            listPage.map((page: any, index: number) => {
              return (
                <li key={index} className={classes.li}>
                  <Link to={page.link} className={classes.a}>
                    <span>{page.text}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </ListNavBar>
      <ListNavBar className={classes.NavBarWrap}>
        <InputSearchWrap>
          <TextField
            placeholder="Search"
            onChange={handleSearchFilm}
            onFocus={() => setActive(true)}
            autoComplete="off"
            value={keyword}
            onBlur={() => setActive(false)}
            InputProps={{
              className: `${classes.input} ${classes.wrap} input_inner`,
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: '#f5f5f5', cursor: 'pointer' }} />
                </InputAdornment>
              ),
            }}
          />
          {active && (
            <div className="select-dropdown">
              <div className="select-scrollbar">
                <div className="select-dropdown-wrap">
                  <ul className="select-group-wrap">
                    <li className="select-group-title"> Result</li>
                    <li>
                      <ul className="select-group">
                        {searchList.length > 0 &&
                          searchList.map((item: any, index: number) => {
                            return (
                              <li
                                key={index}
                                className="select-dropdown-item"
                                onMouseDown={() => navigate(`/detail/${item.id}`)}
                              >
                                <span className={`rank-${index + 1} rank-other`}>{index + 1}</span>
                                <span>{item.name}</span>
                              </li>
                            );
                          })}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="popper__arrow"></div>
            </div>
          )}
        </InputSearchWrap>
        <Link to="/" className={classes.wrap}>
          <FileDownloadIcon />
          Download APP
        </Link>
        <Box>
          <Box className={`${classes.wrap} dropdown-language`}>
            <LanguageIcon />
            <Box component="span" className="select-language-label">
              English
            </Box>
            <ExpandMoreIcon className="dropdown-icon" />
          </Box>
        </Box>
        <Box component="span" className="user">
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleDropDown}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              {user ? (
                <Avatar
                  src={user.avatar}
                  sx={{ marginLeft: '10px', width: '32px', height: '32px', objectFit: 'cover' }}
                />
              ) : (
                <Avatar
                  src="https://static.netpop.app/img/avatar-logout.png"
                  sx={{ marginLeft: '10px', width: '32px', height: '32px', objectFit: 'cover' }}
                />
              )}
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            {user ? (
              <div>
                <MenuItem onClick={() => navigate('/my_profile')}>My Account</MenuItem>
                <Divider variant="middle" />
                <MenuItem
                  onClick={() => {
                    dispatch(setUser(null));
                    dispatch(setAuth(false));
                    removeAccessToken();
                    removeRefreshToken();
                  }}
                >
                  Log out
                </MenuItem>
              </div>
            ) : (
              <div>
                <MenuItem
                  onClick={() => {
                    navigate('/login');
                  }}
                >
                  Login
                </MenuItem>
              </div>
            )}
          </Menu>
        </Box>
      </ListNavBar>
    </Navbar>
  );
};
export default Header;
